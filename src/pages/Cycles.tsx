import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import CycleDetails from '@/components/CycleDetails';
import CyclesHeader from '@/components/cycles/CyclesHeader';
import CyclesList from '@/components/cycles/CyclesList';
import LoadingState from '@/components/cycles/LoadingState';
import ErrorState from '@/components/cycles/ErrorState';
import EmptyCyclesState from '@/components/cycles/EmptyCyclesState';
import { useToast } from '@/hooks/use-toast';
import { calculateReturnRate } from '@/utils/investmentUtils';

interface Cycle {
  id: string;
  investment_id: string;
  user_id: string;
  cycle_number: number;
  start_date: string;
  end_date: string;
  amount: number;
  profit: number;
  status: 'active' | 'completed' | 'upcoming';
  materials_recycled: number;
}

interface Investment {
  id: string;
  amount: number;
  cycles: number;
  cycle_return_rate: number;
  status: string;
  creation_date: string;
  next_payout_date: string;
  end_date: string;
  user_id: string;
}

const Cycles = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCycle, setSelectedCycle] = useState<Cycle | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [creatingCycles, setCreatingCycles] = useState(false);
  const [expandedInvestments, setExpandedInvestments] = useState<string[]>([]);

  const fetchCycles = async () => {
    if (!user) {
      console.log("No authenticated user found");
      return [];
    }
    
    console.log("Fetching cycles for user:", user.id);
    
    const { data, error } = await supabase
      .from('cycles')
      .select('*')
      .eq('user_id', user.id);
      
    if (error) {
      console.error("Error fetching cycles:", error);
      throw new Error(error.message);
    }
    
    console.log("Cycles data from Supabase:", data);
    
    return (data || []).map(cycle => ({
      ...cycle,
      status: cycle.status as 'active' | 'completed' | 'upcoming'
    }));
  };

  const fetchInvestments = async () => {
    if (!user) {
      console.log("No authenticated user found when fetching investments");
      return [];
    }
    
    console.log("Fetching investments for user:", user.id);
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', user.id);
      
    if (error) {
      console.error("Error fetching investments:", error);
      throw new Error(error.message);
    }
    
    console.log("Investments data from Supabase:", data);
    return data || [];
  };

  const { 
    data: cycles = [], 
    isLoading: cyclesLoading, 
    error: cyclesError,
    refetch: refetchCycles 
  } = useQuery({
    queryKey: ['cycles', user?.id],
    queryFn: fetchCycles,
    enabled: !!user,
  });

  const {
    data: investments = [],
    isLoading: investmentsLoading,
    error: investmentsError
  } = useQuery({
    queryKey: ['investments-for-cycles', user?.id],
    queryFn: fetchInvestments,
    enabled: !!user,
  });

  // Function to create cycles for an investment
  const createCyclesForInvestment = async (investment: Investment) => {
    if (!user) {
      console.error("No user found, cannot create cycles");
      return;
    }
    
    try {
      setCreatingCycles(true);
      console.log("Creating cycles for investment:", investment.id);
      console.log("Current user ID:", user.id);
      
      const cycleCount = investment.cycles;
      const cycleAmount = investment.amount / cycleCount;
      const returnRate = investment.cycle_return_rate;
      
      // Calculate dates
      const creationDate = new Date(investment.creation_date);
      const endDate = new Date(investment.end_date);
      const cycleDurationDays = Math.floor((endDate.getTime() - creationDate.getTime()) / (cycleCount * 24 * 60 * 60 * 1000));
      
      const cyclesToCreate = [];
      
      for (let i = 1; i <= cycleCount; i++) {
        const cycleStartDate = new Date(creationDate);
        cycleStartDate.setDate(creationDate.getDate() + (i-1) * cycleDurationDays);
        
        const cycleEndDate = new Date(creationDate);
        cycleEndDate.setDate(creationDate.getDate() + i * cycleDurationDays);
        
        // Determine status
        let status: 'active' | 'completed' | 'upcoming' = 'upcoming';
        const now = new Date();
        
        if (now > cycleEndDate) {
          status = 'completed';
        } else if (now >= cycleStartDate && now <= cycleEndDate) {
          status = 'active';
        }
        
        // Calculate profit using half of the return rate for per-cycle profit
        const cycleProfit = cycleAmount * ((returnRate / 2) / 100);
        
        cyclesToCreate.push({
          investment_id: investment.id,
          user_id: user.id,
          cycle_number: i,
          start_date: cycleStartDate.toISOString(),
          end_date: cycleEndDate.toISOString(),
          amount: cycleAmount,
          profit: cycleProfit,
          status: status,
          materials_recycled: status === 'completed' ? 100 : status === 'active' ? Math.floor(Math.random() * 80) + 10 : 0
        });
      }
      
      console.log("Cycles to create:", cyclesToCreate);
      
      const { error } = await supabase
        .from('cycles')
        .insert(cyclesToCreate);
        
      if (error) {
        console.error("Error creating cycles:", error);
        toast({
          title: "Error",
          description: `Failed to create cycles: ${error.message}`,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Cycles Created",
        description: `Successfully created ${cycleCount} cycles for your investment.`
      });
      
      // Refetch cycles to update the UI
      refetchCycles();
    } catch (err) {
      console.error("Error in cycle creation:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred while creating cycles.",
        variant: "destructive"
      });
    } finally {
      setCreatingCycles(false);
    }
  };

  // Check if we have investments but no cycles
  useEffect(() => {
    const checkAndCreateCycles = async () => {
      if (
        user && 
        investments.length > 0 && 
        !cyclesLoading && 
        !investmentsLoading && 
        !creatingCycles
      ) {
        console.log("Checking for investments that need cycles...");
        
        // Find active investments that don't have any cycles
        const investmentsNeedingCycles = investments.filter(investment => {
          const hasExistingCycles = cycles.some(cycle => cycle.investment_id === investment.id);
          return investment.status === 'active' && !hasExistingCycles;
        });

        console.log("Investments needing cycles:", investmentsNeedingCycles);

        // Create cycles for each investment that needs them
        for (const investment of investmentsNeedingCycles) {
          await createCyclesForInvestment(investment);
        }
      }
    };
    
    checkAndCreateCycles();
  }, [user, investments, cycles, cyclesLoading, investmentsLoading, creatingCycles]);

  // Function to validate and correct return rates
  const validateAndCorrectReturnRates = async (investments: Investment[]) => {
    console.log('Validating return rates for investments:', investments);
    let anyUpdates = false;
    let investmentsUpdated = false;
    
    for (const investment of investments) {
      const correctRate = calculateReturnRate(investment.amount);
      console.log(`Investment ${investment.id}:`, {
        amount: investment.amount,
        currentRate: investment.cycle_return_rate,
        correctRate: correctRate,
        needsUpdate: investment.cycle_return_rate !== correctRate
      });
      
      if (investment.cycle_return_rate !== correctRate) {
        anyUpdates = true;
        investmentsUpdated = true;
        console.log(`Correcting return rate for investment ${investment.id} from ${investment.cycle_return_rate}% to ${correctRate}%`);
        
        // Update the investment's return rate
        const { data: updateData, error: updateError, status } = await supabase
          .from('investments')
          .update({ cycle_return_rate: correctRate })
          .eq('id', investment.id)
          .select();
        console.log('Update investment result:', { updateData, updateError, status });

        if (updateError) {
          console.error('Error updating return rate:', updateError);
          continue;
        }

        // Update all cycles for this investment with the correct per-cycle profit
        const { error: cyclesError } = await supabase
          .from('cycles')
          .update({ 
            profit: investment.amount * ((correctRate / 2) / 100)
          })
          .eq('investment_id', investment.id);

        if (cyclesError) {
          console.error('Error updating cycle profits:', cyclesError);
        }
      }
    }

    // If any updates were made, refetch the data
    if (anyUpdates) {
      console.log('Refreshing cycles after updates');
      refetchCycles();
    }
    if (investmentsUpdated) {
      console.log('Would refresh investments after updates (placeholder)');
      // If you have a refetchInvestments function, call it here
      // Example: refetchInvestments();
      // Do NOT reload the page here to avoid infinite loops
    }
  };

  // Add validation when investments are loaded
  useEffect(() => {
    if (investments.length > 0 && !investmentsLoading) {
      validateAndCorrectReturnRates(investments);
    }
  }, [investments, investmentsLoading]);

  console.log("Cycles in component:", cycles);

  const handleViewDetails = (cycle: Cycle) => {
    setSelectedCycle(cycle);
    setOpenDetails(true);
  };

  const handleGoToInvestments = () => {
    window.location.href = '/investments';
  };

  const toggleInvestment = (investmentId: string) => {
    setExpandedInvestments((prev) =>
      prev.includes(investmentId)
        ? prev.filter((id) => id !== investmentId)
        : [...prev, investmentId]
    );
  };

  // If user is not authenticated, we should show some kind of message
  if (!user) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 p-8">
          <CyclesHeader />
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
            <p>Please login to view your cycles</p>
          </div>
        </div>
      </div>
    );
  }

  const isLoading = cyclesLoading || investmentsLoading || creatingCycles;
  const error = cyclesError || investmentsError;

  // Check if we have any cycles at all
  const hasCycles = Array.isArray(cycles) && cycles.length > 0;

  // Add a new section to group cycles by investment
  const groupedCycles = investments.map(investment => {
    const investmentCycles = cycles.filter(cycle => cycle.investment_id === investment.id);
    return {
      investment,
      cycles: investmentCycles
    };
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 p-4 md:p-8">
        <CyclesHeader />
        {cyclesLoading ? (
          <LoadingState />
        ) : cyclesError ? (
          <ErrorState />
        ) : cycles.length === 0 ? (
          <EmptyCyclesState onGoToInvestments={handleGoToInvestments} />
        ) : (
          <div className="space-y-6">
            {groupedCycles.map(({ investment, cycles }) => {
              const isExpanded = expandedInvestments.includes(investment.id);
              // Find the current active cycle number for this investment
              const activeCycle = cycles.find(cycle => cycle.status === 'active');
              const activeCycleText = investment.status === 'active' && activeCycle
                ? `Active (Cycle ${activeCycle.cycle_number} of ${investment.cycles})`
                : investment.status.charAt(0).toUpperCase() + investment.status.slice(1);
              return (
                <div key={investment.id} className="bg-white rounded-lg border border-slate-200">
                  <button
                    className="w-full flex flex-col md:flex-row md:items-center justify-between p-6 focus:outline-none hover:bg-slate-50 rounded-t-lg text-left"
                    onClick={() => toggleInvestment(investment.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-1">
                      <span className="text-lg font-semibold">${investment.amount}</span>
                      <span className="text-sm text-gray-600">{investment.cycle_return_rate}% per 2 cycles</span>
                      <span className="text-sm text-gray-600">{investment.cycles} cycles</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${investment.status === 'active' ? 'bg-green-100 text-green-800' : investment.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>{activeCycleText}</span>
                      <span className="text-xs text-gray-500">Start: {new Date(investment.creation_date).toLocaleDateString()}</span>
                      <span className="text-xs text-gray-500">End: {new Date(investment.end_date).toLocaleDateString()}</span>
                    </div>
                    <span className="ml-4 text-gray-500">{isExpanded ? '▲' : '▼'}</span>
                  </button>
                  {isExpanded && (
                    <div className="p-6 pt-0">
                      <p>Return Rate: {investment.cycle_return_rate}% per 2 cycles</p>
                      <p>Total Cycles: {investment.cycles}</p>
                      <CyclesList cycles={cycles} onViewDetails={handleViewDetails} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <Sheet open={openDetails} onOpenChange={setOpenDetails}>
        <SheetContent className="sm:max-w-lg overflow-y-auto max-h-[90vh]">
          <SheetHeader>
            <SheetTitle>Cycle Details</SheetTitle>
          </SheetHeader>
          {selectedCycle && (
            <CycleDetails cycle={selectedCycle} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Cycles;
