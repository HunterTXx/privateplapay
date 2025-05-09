import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useAccurateDepositBalance(userId: string | undefined) {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (!userId) return;
    async function fetchBalance() {
      try {
        // 1. Sum all approved deposits
        const { data: deposits, error: depositsError } = await supabase
          .from('deposits')
          .select('amount, status')
          .eq('user_id', userId)
          .eq('status', 'approved');
        if (depositsError) throw depositsError;
        const totalDeposits = deposits.reduce((sum, d) => sum + (d.amount || 0), 0);

        // 2. Sum all approved withdrawals
        const { data: withdrawals, error: withdrawalsError } = await supabase
          .from('withdrawal_requests')
          .select('amount, status')
          .eq('user_id', userId)
          .eq('status', 'approved');
        if (withdrawalsError) throw withdrawalsError;
        const totalWithdrawals = withdrawals.reduce((sum, w) => sum + (w.amount || 0), 0);

        // 3. Sum all investments
        const { data: investments, error: investmentsError } = await supabase
          .from('investments')
          .select('amount, status')
          .eq('user_id', userId);
        if (investmentsError) throw investmentsError;
        const totalInvestments = investments.reduce((sum, i) => sum + (i.amount || 0), 0);

        // 4. Sum all completed profit/principal returns
        const { data: transactions, error: transactionsError } = await supabase
          .from('transactions')
          .select('amount, type, status')
          .eq('user_id', userId)
          .eq('status', 'completed');
        if (transactionsError) throw transactionsError;
        const totalProfits = transactions
          .filter(t => t.type === 'profit')
          .reduce((sum, t) => sum + (t.amount || 0), 0);
        const totalPrincipalReturns = transactions
          .filter(t => t.type === 'principal_return')
          .reduce((sum, t) => sum + (t.amount || 0), 0);

        // 5. Calculate accurate deposit balance
        const accurateBalance = totalDeposits + totalProfits + totalPrincipalReturns - totalWithdrawals - totalInvestments;
        setBalance(accurateBalance);
      } catch (error) {
        setBalance(0);
      }
    }
    fetchBalance();
    const intervalId = setInterval(fetchBalance, 15000);
    return () => clearInterval(intervalId);
  }, [userId]);

  return balance;
} 