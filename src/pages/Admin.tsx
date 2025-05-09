import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader, AlertCircle } from 'lucide-react';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminInvestments from '@/components/admin/AdminInvestments';
import AdminDeposits from '@/components/admin/AdminDeposits';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminWithdrawals from '@/components/admin/AdminWithdrawals';
import AdminNews from '@/components/admin/AdminNews';
import WebVitalsDashboard from '@/components/WebVitalsDashboard';

const Admin = () => {
  const { isAdmin, loading: checkingAdmin } = useAdmin();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pendingCounts, setPendingCounts] = useState({ deposits: 0, withdrawals: 0 });

  useEffect(() => {
    // Only redirect if admin check is done, user is defined, and user is not admin
    if (!checkingAdmin && user && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, checkingAdmin, user, navigate]);

  useEffect(() => {
    // Fetch pending counts for notifications
    async function fetchPendingCounts() {
      try {
        const [{ count: depositCount, error: depositError }, { count: withdrawalCount, error: withdrawalError }] = await Promise.all([
          supabase.from('deposits').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('withdrawal_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        ]);
        if (depositError || withdrawalError) {
          console.error('Error fetching pending counts:', depositError, withdrawalError);
          // Optionally show a toast here
          return;
        }
        setPendingCounts({
          deposits: depositCount || 0,
          withdrawals: withdrawalCount || 0,
        });
      } catch (error) {
        console.error('Error fetching pending counts:', error);
        // Optionally show a toast here
      }
    }
    fetchPendingCounts();
  }, []);

  if (checkingAdmin) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader className="h-8 w-8 animate-spin text-investment-green" />
            <p>Verifying admin permissions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-center sm:text-left w-full">Admin Dashboard</h1>
          {(pendingCounts.deposits > 0 || pendingCounts.withdrawals > 0) && (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-end w-full">
              {pendingCounts.deposits > 0 && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium text-center">
                  {pendingCounts.deposits} deposit{pendingCounts.deposits > 1 ? 's' : ''} pending approval
                </span>
              )}
              {pendingCounts.withdrawals > 0 && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium text-center">
                  {pendingCounts.withdrawals} withdrawal{pendingCounts.withdrawals > 1 ? 's' : ''} pending approval
                </span>
              )}
            </div>
          )}
        </div>
        <AdminOverview />

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="w-full flex flex-wrap gap-2 mb-4">
            <TabsTrigger value="users" className="flex-1 min-w-[100px]">Users</TabsTrigger>
            <TabsTrigger value="investments" className="flex-1 min-w-[100px]">Investments</TabsTrigger>
            <TabsTrigger value="deposits" className="flex-1 min-w-[100px]">Deposits</TabsTrigger>
            <TabsTrigger value="withdrawals" className="flex-1 min-w-[100px]">Withdrawals</TabsTrigger>
            <TabsTrigger value="news" className="flex-1 min-w-[100px]">News</TabsTrigger>
            <TabsTrigger value="performance" className="flex-1 min-w-[100px]">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>

          <TabsContent value="investments">
            <AdminInvestments />
          </TabsContent>

          <TabsContent value="deposits">
            <AdminDeposits />
          </TabsContent>

          <TabsContent value="withdrawals">
            <AdminWithdrawals />
          </TabsContent>

          <TabsContent value="news">
            <AdminNews />
          </TabsContent>

          <TabsContent value="performance">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Web Performance Metrics</h2>
              <WebVitalsDashboard />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
