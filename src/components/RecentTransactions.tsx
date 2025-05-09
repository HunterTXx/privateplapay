import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Loader } from 'lucide-react';

const RecentTransactions = () => {
  const { user } = useAuth();
  
  const fetchRecentTransactions = async () => {
    if (!user) return [];
    
    // Fetch deposits
    const { data: deposits = [] } = await supabase
      .from('deposits')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    // Fetch investments
    const { data: investments = [] } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', user.id)
      .order('creation_date', { ascending: false });
    // Fetch withdrawal requests
    const { data: withdrawals = [] } = await supabase
      .from('withdrawal_requests')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    // Map to unified transaction objects
    const depositTxs = deposits.map(d => ({
      id: d.id,
      type: 'deposit',
      amount: d.amount,
      status: d.status,
      date: d.created_at,
      description: `Deposit (${d.currency || ''})`,
    }));
    const investmentTxs = investments.map(i => ({
      id: i.id,
      type: 'investment',
      amount: i.amount,
      status: i.status,
      date: i.creation_date,
      description: `Investment (${i.cycles} cycles)`
    }));
    const withdrawalTxs = withdrawals.map(w => ({
      id: w.id,
      type: 'withdrawal',
      amount: w.amount,
      status: w.status,
      date: w.created_at,
      description: `Withdrawal request`
    }));

    // Merge and sort by date descending
    const allTxs = [...depositTxs, ...investmentTxs, ...withdrawalTxs]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    return allTxs;
  };
  
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['recent-transactions', user?.id],
    queryFn: fetchRecentTransactions,
    enabled: !!user,
  });
  
  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'withdrawal':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'investment':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'profit':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-5">
        <h2 className="text-lg font-semibold mb-6">Recent Transactions</h2>
        <div className="flex justify-center py-8">
          <Loader className="h-6 w-6 animate-spin text-investment-green" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-5">
      <h2 className="text-lg font-semibold mb-6">Recent Transactions</h2>
      
      {transactions.length > 0 ? (
        <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'deposit' 
                    ? 'bg-green-100' 
                    : transaction.type === 'withdrawal' 
                    ? 'bg-red-100' 
                    : 'bg-blue-100'
                }`}>
                  <span className={`text-lg ${
                    transaction.type === 'deposit' 
                      ? 'text-green-600' 
                      : transaction.type === 'withdrawal'  
                      ? 'text-red-600' 
                      : 'text-blue-600'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : 
                     transaction.type === 'withdrawal' ? '-' : 
                     '↦'}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{
                    transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)
                  }</p>
                  <p className="text-xs text-slate-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  transaction.type === 'deposit' 
                    ? 'text-green-600' 
                    : transaction.type === 'withdrawal' 
                    ? 'text-red-600' 
                    : 'text-blue-600'
                }`}>
                  {transaction.type === 'deposit' ? '+' : ''}
                  ${transaction.amount.toFixed(2)}
                </p>
                <Badge 
                  variant="outline" 
                  className={getTransactionTypeColor(transaction.type)}
                >
                  {transaction.status}
                </Badge>
                <div className="text-xs text-slate-400">{transaction.description}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-slate-50 rounded-md">
          <p className="text-slate-500">No recent transactions</p>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
