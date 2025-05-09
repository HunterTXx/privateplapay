import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAccurateDepositBalance } from '@/hooks/useAccurateDepositBalance';
import { useToast } from '@/hooks/use-toast';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, Loader } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { calculateReturnRate } from '@/utils/investmentUtils';

interface NewInvestmentFormProps {
  onSuccess: () => void;
}

const NewInvestmentForm: React.FC<NewInvestmentFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(1000);
  const [cycles, setCycles] = useState<number>(10);
  const [returnRate, setReturnRate] = useState<number>(8);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const depositBalance = useAccurateDepositBalance(user?.id);

  // Calculate return rate based on investment amount
  useEffect(() => {
    const rate = calculateReturnRate(amount);
    setReturnRate(rate);
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to create an investment",
      });
      return;
    }

    if (amount < 50) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "The minimum investment amount is $50",
      });
      return;
    }

    if (amount > depositBalance) {
      toast({
        variant: "destructive",
        title: "Insufficient Balance",
        description: "Your deposit balance is not enough for this investment",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const today = new Date();
      const nextPayoutDate = new Date(today);
      nextPayoutDate.setDate(today.getDate() + 14); // 14 days for first cycle
      
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + (14 * cycles)); // 14 days * number of cycles

      // Create the investment
      const { data: investmentData, error: investmentError } = await supabase
        .from('investments')
        .insert([
          {
            user_id: user.id,
            amount: amount,
            cycles: cycles,
            cycle_return_rate: returnRate,
            status: 'active',
            next_payout_date: nextPayoutDate.toISOString(),
            end_date: endDate.toISOString(),
          }
        ])
        .select()
        .single();

      if (investmentError) throw investmentError;

      // Create cycles for this investment
      for (let i = 1; i <= cycles; i++) {
        const cycleStartDate = new Date(today);
        cycleStartDate.setDate(today.getDate() + (i - 1) * 14); // 14 days per cycle
        const cycleEndDate = new Date(cycleStartDate);
        cycleEndDate.setDate(cycleStartDate.getDate() + 14);

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
              investment_id: investmentData.id,
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

      // Record the transaction
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert([
          {
            user_id: user.id,
            investment_id: investmentData.id,
            type: 'investment',
            amount: amount,
            status: 'completed',
            description: `Investment created with ${cycles} cycles`,
          }
        ]);

      if (transactionError) throw transactionError;

      toast({
        title: "Investment Created",
        description: `Your investment of $${amount} has been created successfully`,
      });
      
      onSuccess();
    } catch (error: any) {
      console.error('Error creating investment:', error);
      toast({
        variant: "destructive",
        title: "Error Creating Investment",
        description: error.message || "Failed to create investment",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2" />
        <div>
          <h3 className="font-medium text-red-800">Error</h3>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-6">
      <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 text-sm text-yellow-800">
        <p className="font-medium">Available Balance: ${depositBalance.toFixed(2)}</p>
        {depositBalance < 50 && (
          <p className="mt-2 text-xs">
            Your balance is below the minimum investment amount ($50). Please deposit funds first.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm font-medium">Investment Amount</label>
          <span className="text-sm font-medium">${amount}</span>
        </div>
        <Input
          type="number"
          min="50"
          max={depositBalance}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full"
        />
        <div className="grid grid-cols-3 gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => setAmount(500)} className="text-xs h-8">$500</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setAmount(1000)} className="text-xs h-8">$1,000</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setAmount(5000)} className="text-xs h-8">$5,000</Button>
        </div>
        <p className="text-xs text-slate-500">Minimum investment: $50</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm font-medium">Number of Cycles</label>
          <span className="text-sm font-medium">{cycles} cycles ({cycles * 14} days)</span>
        </div>
        <Slider
          value={[cycles]}
          min={1}
          max={30}
          step={1}
          className="mb-4"
          onValueChange={(value) => setCycles(value[0])}
        />
        <div className="grid grid-cols-4 gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => setCycles(4)} className="text-xs h-8">4</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setCycles(8)} className="text-xs h-8">8</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setCycles(12)} className="text-xs h-8">12</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setCycles(24)} className="text-xs h-8">24</Button>
        </div>
      </div>
      
      <div className="p-4 border rounded-md bg-slate-50">
        <div className="mb-2">
          <p className="text-sm font-medium">Return Rate:</p>
          <p className="text-xl font-bold text-investment-green">{returnRate}% per cycle</p>
        </div>
        <div className="mb-2">
          <p className="text-sm">Total Profit after {cycles} cycles:</p>
          <p className="text-lg font-medium text-investment-green">
            ${(amount * (returnRate / 100) * cycles).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm">Total Return:</p>
          <p className="text-lg font-medium">
            ${(amount + (amount * (returnRate / 100) * cycles)).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting || depositBalance < 50 || amount > depositBalance} 
          className="w-full bg-investment-green hover:bg-green-600"
        >
          {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
          Create Investment
        </Button>
      </div>
    </form>
  );
};

export default NewInvestmentForm;
