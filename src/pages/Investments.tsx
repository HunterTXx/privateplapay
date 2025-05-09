import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import NewInvestmentForm from '@/components/NewInvestmentForm';
import InvestmentDetails from '@/components/InvestmentDetails';
import InvestmentsHeader from '@/components/investments/InvestmentsHeader';
import InvestmentsList from '@/components/investments/InvestmentsList';
import EmptyInvestmentState from '@/components/investments/EmptyInvestmentState';
import LoadingState from '@/components/investments/LoadingState';
import ErrorState from '@/components/investments/ErrorState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { completeCyclesAndPayout } from '@/utils/completeCyclesAndPayout';

interface Investment {
  id: string;
  amount: number;
  cycles: number;
  cycle_return_rate: number;
  status: 'active' | 'completed' | 'pending';
  creation_date: string;
  next_payout_date: string;
  end_date: string;
}

const Investments = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [openNewInvestment, setOpenNewInvestment] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  // Automatically process profit payouts for completed cycles on page load
  React.useEffect(() => {
    if (user) {
      completeCyclesAndPayout(user.id).then(() => {
        // Optionally, you can show a toast or refetch data
        refetch();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchInvestments = async () => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .order('creation_date', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    
    return data || [];
  };

  const { 
    data: investments = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['investments', user?.id],
    queryFn: fetchInvestments,
    enabled: !!user,
  });

  const handleViewDetails = (investment: Investment) => {
    setSelectedInvestment(investment);
    setOpenDetails(true);
  };

  const handleInvestmentCreated = () => {
    setOpenNewInvestment(false);
    refetch();
    toast({
      title: "Investment Created",
      description: "Your investment has been successfully created",
    });
  };

  const handleOpenNewInvestment = () => {
    setOpenNewInvestment(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 p-4 md:p-8">
        <InvestmentsHeader 
          onOpenNewInvestment={handleOpenNewInvestment} 
          openNewInvestment={openNewInvestment} 
        />
        <div className="mb-4 md:mb-6">
          <Tabs defaultValue="investments" className="w-full">
            <TabsList className="w-full flex flex-wrap gap-2 mb-4">
              <TabsTrigger value="investments" className="flex-1 min-w-[120px]">My Investments</TabsTrigger>
            </TabsList>
            <TabsContent value="investments">
              {isLoading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState message={(error as Error).message} />
              ) : investments.length === 0 ? (
                <EmptyInvestmentState onCreateNew={() => setOpenNewInvestment(true)} />
              ) : (
                <div className="grid gap-4 md:gap-6">
                  <InvestmentsList 
                    investments={investments as Investment[]} 
                    onViewDetails={handleViewDetails} 
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Sheet open={openNewInvestment} onOpenChange={setOpenNewInvestment}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Create New Investment</SheetTitle>
          </SheetHeader>
          <NewInvestmentForm onSuccess={handleInvestmentCreated} />
        </SheetContent>
      </Sheet>

      <Sheet open={openDetails} onOpenChange={setOpenDetails}>
        <SheetContent className="sm:max-w-lg overflow-y-auto max-h-screen">
          <SheetHeader>
            <SheetTitle>Investment Details</SheetTitle>
          </SheetHeader>
          {selectedInvestment && (
            <InvestmentDetails investment={selectedInvestment} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Investments;
