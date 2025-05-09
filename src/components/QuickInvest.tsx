import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { useAccurateDepositBalance } from '@/hooks/useAccurateDepositBalance';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';
import { calculateReturnRate } from '@/utils/investmentUtils';

const QuickInvest: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<string>("1000");
  const [cycles, setCycles] = useState<string>("10");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const depositBalance = useAccurateDepositBalance(user?.id);
  
  const processingFee = Number(investmentAmount) * 0.02;
  const estimatedReturn = Number(investmentAmount) * 0.25;
  const totalEstimated = Number(investmentAmount) + estimatedReturn;
  
  const handleInvest = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to make an investment",
        variant: "destructive"
      });
      return;
    }

    const amount = Number(investmentAmount);
    
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid investment amount",
        variant: "destructive"
      });
      return;
    }
    
    if (amount > depositBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this investment",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const returnRate = calculateReturnRate(amount);

      // Create new investment
      const { data: investment, error: investmentError } = await supabase
        .from('investments')
        .insert({
          user_id: user.id,
          amount: amount,
          cycles: Number(cycles),
          cycle_return_rate: returnRate,
          status: 'active',
          next_payout_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
          end_date: new Date(Date.now() + Number(cycles) * 30 * 24 * 60 * 60 * 1000).toISOString(), // cycles * 30 days
        })
        .select('id')
        .single();
        
      if (investmentError) throw investmentError;
      
      // Create cycles for this investment
      for (let i = 1; i <= Number(cycles); i++) {
        const cycleStartDate = new Date();
        cycleStartDate.setDate(cycleStartDate.getDate() + (i - 1) * 30); // 30 days per cycle
        const cycleEndDate = new Date(cycleStartDate);
        cycleEndDate.setDate(cycleStartDate.getDate() + 30);

        // Set correct status
        const now = new Date();
        let status = 'upcoming';
        if (now > cycleEndDate) {
          status = 'completed';
        } else if (now >= cycleStartDate && now <= cycleEndDate) {
          status = 'active';
        }

        const { error: cycleError } = await supabase
          .from('cycles')
          .insert([
            {
              investment_id: investment.id,
              user_id: user.id,
              cycle_number: i,
              start_date: cycleStartDate.toISOString(),
              end_date: cycleEndDate.toISOString(),
              amount: amount,
              profit: amount * ((returnRate / 2) / 100), // Half of the return rate for per-cycle profit
              status,
            }
          ]);

        if (cycleError) throw cycleError;
      }

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          amount: amount,
          type: 'investment',
          description: 'New investment created',
          investment_id: investment?.id,
          status: 'completed'
        });
        
      if (transactionError) throw transactionError;

      toast({
        title: "Investment Created",
        description: "Your investment has been successfully created",
      });

      // Navigate to investments page
      navigate('/investments');
    } catch (error) {
      console.error('Investment failed:', error);
      toast({
        title: "Investment Failed",
        description: "There was an error creating your investment",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-5">
      <h2 className="text-lg font-semibold mb-2">Quick Invest</h2>
      <p className="text-sm text-slate-500 mb-4">Start or increase your investment</p>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount ($)</label>
          <Input
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Cycles</label>
          <Input
            type="number"
            value={cycles}
            onChange={(e) => setCycles(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="border-t border-slate-100 pt-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-slate-500">Investment Amount</span>
          <span className="text-sm font-medium">$ {Number(investmentAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-slate-500">Processing Fee (2%)</span>
          <span className="text-sm font-medium">$ {processingFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-slate-500">Estimated Return (25%)</span>
          <span className="text-sm font-medium">$ {estimatedReturn.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
      </div>
      
      <div className="border-t border-slate-100 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Estimated Total After {cycles} Cycles</span>
          <span className="text-lg font-bold text-investment-green">
            $ {totalEstimated.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </span>
        </div>
      </div>
      
      <Button 
        className="w-full bg-investment-green hover:bg-green-600" 
        onClick={handleInvest}
        disabled={isLoading || depositBalance < Number(investmentAmount)}
      >
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : depositBalance < Number(investmentAmount) ? (
          'Insufficient Balance'
        ) : (
          'Invest Now'
        )}
      </Button>
      
      {depositBalance > 0 && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Your available balance: $ {depositBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </p>
      )}
    </div>
  );
};

export default QuickInvest;
