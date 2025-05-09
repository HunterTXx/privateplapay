import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader } from 'lucide-react';

const AdminOverview: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInvestments: 0,
    totalInvested: 0,
    totalProfitPaid: 0,
    pendingDeposits: 0,
    pendingWithdrawals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const [users, investments, profitTx, deposits, withdrawals] = await Promise.all([
          supabase.from('profiles').select('id'),
          supabase.from('investments').select('amount'),
          supabase.from('transactions').select('amount').eq('type', 'profit'),
          supabase.from('deposits').select('id').eq('status', 'pending'),
          supabase.from('withdrawal_requests').select('id').eq('status', 'pending'),
        ]);
        if (users.error || investments.error || profitTx.error || deposits.error || withdrawals.error) {
          console.error('Error fetching admin stats:', users.error, investments.error, profitTx.error, deposits.error, withdrawals.error);
          setLoading(false);
          // Optionally show a toast here
          return;
        }
        setStats({
          totalUsers: users.data?.length || 0,
          totalInvestments: investments.data?.length || 0,
          totalInvested: investments.data?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0,
          totalProfitPaid: profitTx.data?.reduce((sum, tx) => sum + (tx.amount || 0), 0) || 0,
          pendingDeposits: deposits.data?.length || 0,
          pendingWithdrawals: withdrawals.data?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        // Optionally show a toast here
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader className="h-8 w-8 animate-spin text-investment-green" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-5 text-center">
        <div className="text-xs text-gray-500 mb-1">Total Users</div>
        <div className="text-2xl font-bold text-investment-green">{stats.totalUsers}</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-5 text-center">
        <div className="text-xs text-gray-500 mb-1">Total Investments</div>
        <div className="text-2xl font-bold text-blue-600">{stats.totalInvestments}</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-5 text-center">
        <div className="text-xs text-gray-500 mb-1">Total Invested</div>
        <div className="text-2xl font-bold text-amber-600">${stats.totalInvested.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-5 text-center">
        <div className="text-xs text-gray-500 mb-1">Total Profit Paid</div>
        <div className="text-2xl font-bold text-purple-600">${stats.totalProfitPaid.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-5 text-center">
        <div className="text-xs text-gray-500 mb-1">Pending Deposits</div>
        <div className="text-2xl font-bold text-red-600">{stats.pendingDeposits}</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-5 text-center">
        <div className="text-xs text-gray-500 mb-1">Pending Withdrawals</div>
        <div className="text-2xl font-bold text-orange-600">{stats.pendingWithdrawals}</div>
      </div>
    </div>
  );
};

export default AdminOverview; 