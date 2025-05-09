import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wallet, Trophy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useInvestorLevel } from '@/hooks/useInvestorLevel';
import { Badge } from '@/components/ui/badge';
import UserLevel from '@/components/UserLevel';

const UserMenu = () => {
  const { user } = useAuth();
  const [calculatedDepositBalance, setCalculatedDepositBalance] = useState(0);
  const [calculatedWithdrawBalance, setCalculatedWithdrawBalance] = useState(0);
  const [levelData, levelLoading] = useInvestorLevel();

  const fetchBalances = async () => {
    if (!user) return;
    try {
      // 1. Sum all approved deposits
      const { data: deposits, error: depositsError } = await supabase
        .from('deposits')
        .select('amount, status')
        .eq('user_id', user.id)
        .eq('status', 'approved');
      if (depositsError) throw depositsError;
      const totalDeposits = deposits.reduce((sum, d) => sum + (d.amount || 0), 0);

      // 2. Sum all approved withdrawals
      const { data: withdrawals, error: withdrawalsError } = await supabase
        .from('withdrawal_requests')
        .select('amount, status')
        .eq('user_id', user.id)
        .eq('status', 'approved');
      if (withdrawalsError) throw withdrawalsError;
      const totalWithdrawals = withdrawals.reduce((sum, w) => sum + (w.amount || 0), 0);
      setCalculatedWithdrawBalance(totalWithdrawals);

      // 3. Sum all investments (active or completed)
      const { data: investments, error: investmentsError } = await supabase
        .from('investments')
        .select('amount, status')
        .eq('user_id', user.id);
      if (investmentsError) throw investmentsError;
      const totalInvestments = investments.reduce((sum, i) => sum + (i.amount || 0), 0);

      // 4. Sum all completed profit/principal returns
      const { data: transactions, error: transactionsError } = await supabase
        .from('transactions')
        .select('amount, type, status')
        .eq('user_id', user.id)
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
      setCalculatedDepositBalance(accurateBalance);
    } catch (error) {
      console.error('Error calculating balances:', error);
    }
  };

  useEffect(() => {
    fetchBalances();
    const intervalId = setInterval(fetchBalances, 15000);
    return () => clearInterval(intervalId);
  }, [user]);

  if (!user) return null;

  // Get initials for avatar fallback
  const getInitials = () => {
    const email = user.email || '';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col p-4 border-t">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user.email}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <p className="text-xs text-muted-foreground">Investor</p>
              {levelData && !levelLoading && (
                <Badge 
                  variant="outline"
                  className="flex items-center gap-0.5 h-5 px-1.5 text-xs bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200 max-w-[70px] overflow-hidden whitespace-nowrap text-ellipsis"
                  style={{ minWidth: '0', maxWidth: '70px' }}
                >
                  <Trophy className="h-3 w-3 text-amber-500" />
                  <span className="font-semibold">Lv</span>
                  <span className="font-bold">{levelData.level}</span>
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-1">
        <div className="bg-green-50 rounded-md p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Wallet className="h-3.5 w-3.5 text-green-600" />
            <span className="text-xs text-green-700">Deposit Balance</span>
          </div>
          <p className="text-sm font-medium">${calculatedDepositBalance.toFixed(2)}</p>
        </div>
        <div className="bg-blue-50 rounded-md p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Wallet className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-xs text-blue-700">Withdraw Balance</span>
          </div>
          <p className="text-sm font-medium">${calculatedWithdrawBalance.toFixed(2)}</p>
        </div>
      </div>
      {levelData && !levelLoading && (
        <div className="mt-3">
          <UserLevel 
            level={levelData.level}
            progress={levelData.currentXP}
            nextLevelThreshold={levelData.nextLevelXP}
          />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
