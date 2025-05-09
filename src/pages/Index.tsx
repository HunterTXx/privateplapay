import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import StatCard from '@/components/StatCard';
import ProfitChart from '@/components/ProfitChart';
import TipsAndBestPractices from '@/components/TipsAndBestPractices';
import RecentTransactions from '@/components/RecentTransactions';
import CycleProgress from '@/components/CycleProgress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useInvestorLevel } from '@/hooks/useInvestorLevel';
import UserLevel from '@/components/UserLevel';
import ProjectNews from '@/components/ProjectNews';
import { useAdmin } from '@/hooks/useAdmin';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAccurateDepositBalance } from '@/hooks/useAccurateDepositBalance';

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
  materials_recycled: number | null;
}

const Index = () => {
  const { user } = useAuth();
  const depositBalance = useAccurateDepositBalance(user?.id);
  const [levelData] = useInvestorLevel();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [welcomeShown, setWelcomeShown] = useState(false);

  useEffect(() => {
    if (!adminLoading && isAdmin && window.location.pathname !== '/admin') {
      navigate('/admin', { replace: true });
    }
  }, [isAdmin, adminLoading, navigate]);

  // Show welcome toast with recent events
  useEffect(() => {
    if (!user || welcomeShown) return;
    (async () => {
      // Fetch recent transactions (last 24h)
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { data: txs, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', since)
        .order('created_at', { ascending: false });
      if (error) return;
      const profits = txs.filter(t => t.type === 'profit');
      const principalReturns = txs.filter(t => t.type === 'principal_return');
      const newInvestments = txs.filter(t => t.type === 'investment');
      let msg = '';
      if (profits.length > 0) {
        const totalProfit = profits.reduce((sum, t) => sum + (t.amount || 0), 0);
        msg += `+ $${totalProfit.toFixed(2)} profit credited. `;
      }
      if (principalReturns.length > 0) {
        const totalPrincipal = principalReturns.reduce((sum, t) => sum + (t.amount || 0), 0);
        msg += `$${totalPrincipal.toFixed(2)} principal returned. `;
      }
      if (newInvestments.length > 0) {
        msg += `${newInvestments.length} new investment${newInvestments.length > 1 ? 's' : ''} created. `;
      }
      if (msg) {
        toast({
          title: `Welcome back!`,
          description: msg.trim(),
          duration: 15000,
          variant: 'default',
        });
      }
      setWelcomeShown(true);
    })();
  }, [user, toast, welcomeShown]);

  const fetchDashboardData = async () => {
    if (!user) {
      // For demo purposes, return demo data
      return generateDemoData();
    }

    try {
      // Try to fetch real data
      // Fetch investments
      const { data: investments, error: invError } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user.id);

      if (invError) throw invError;

      // Fetch active cycles
      const { data: cyclesData, error: cyclesError } = await supabase
        .from('cycles')
        .select('*')
        .eq('user_id', user.id)
        .order('end_date', { ascending: true });

      if (cyclesError) throw cyclesError;

      // Properly type the cycles to match the expected type
      const cycles: Cycle[] = cyclesData ? cyclesData.map(cycle => ({
        ...cycle,
        status: cycle.status as 'active' | 'completed' | 'upcoming'
      })) : [];

      // Fetch transactions for profit calculation
      const { data: transactions, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'profit')
        .order('created_at', { ascending: false });

      if (txError) throw txError;

      // Calculate total investment amount
      const totalInvestment = investments?.reduce((sum, inv) => sum + inv.amount, 0) || 0;

      // Calculate total profit
      const totalProfit = transactions?.reduce((sum, tx) => sum + tx.amount, 0) || 0;

      // Count active cycles
      const activeCycles = cycles?.filter(c => c.status === 'active').length || 0;

      // Calculate total recycled material
      const totalRecycled = cycles?.reduce((sum, c) => sum + (c.materials_recycled || 0), 0) || 0;

      // Get most recent active cycle
      const activeCycle = cycles?.find(c => c.status === 'active') || null;

      return {
        totalInvestment,
        totalProfit,
        activeCycles,
        totalRecycled,
        activeCycle,
        investments,
        cycles,
        transactions
      };
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // If error fetching real data, return demo data
      return generateDemoData();
    }
  };

  // Generate demo data for users who aren't logged in or have no data
  const generateDemoData = () => {
    const demoInvestments = Array(3).fill(0).map((_, i) => ({
      id: `demo-inv-${i}`,
      amount: 1000 + (i * 500),
      cycles: 10,
      cycle_return_rate: 8 + i,
      status: i === 0 ? 'active' : i === 1 ? 'pending' : 'completed',
      creation_date: new Date(2024, 3, 1 + i * 5).toISOString(),
      next_payout_date: new Date(2024, 5, 15 + i * 10).toISOString(),
      end_date: new Date(2024, 8, 1 + i * 30).toISOString(),
    }));

    const demoCycles: Cycle[] = Array(10).fill(0).map((_, i) => ({
      id: `demo-cycle-${i}`,
      investment_id: 'demo-inv-0',
      user_id: 'demo-user',
      cycle_number: i + 1,
      start_date: new Date(2024, 3, 1 + i * 14).toISOString(),
      end_date: new Date(2024, 3, 15 + i * 14).toISOString(),
      amount: 100,
      profit: 8,
      status: i === 2 ? 'active' : i < 2 ? 'completed' : 'upcoming',
      materials_recycled: i === 2 ? 60 : i < 2 ? 100 : 0,
    }));

    const demoTransactions = Array(5).fill(0).map((_, i) => ({
      id: `demo-tx-${i}`,
      amount: 25 + (i * 5),
      type: 'profit',
      status: 'completed',
      created_at: new Date(2024, 3, 20 - i * 3).toISOString(),
      description: `Profit from cycle ${i + 1}`,
    }));

    return {
      totalInvestment: 2500,
      totalProfit: 120,
      activeCycles: 1,
      totalRecycled: 260,
      activeCycle: demoCycles.find(c => c.status === 'active') || null,
      investments: demoInvestments,
      cycles: demoCycles,
      transactions: demoTransactions
    };
  };

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard', user?.id],
    queryFn: fetchDashboardData,
    enabled: true, // Always enabled to show demo data if no user
  });

  if (isLoading || !dashboardData) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader className="h-8 w-8 animate-spin text-investment-green" />
            <p className="text-sm text-slate-500">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <DashboardHeader />
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          <StatCard 
            title="Total Investment"
            value={`$ ${dashboardData.totalInvestment.toFixed(2)}`}
            change={{ value: `${dashboardData.investments.length} active investments`, isPositive: true }}
          />
          
          <StatCard 
            title="Current Profit"
            value={`$ ${dashboardData.totalProfit.toFixed(2)}`}
            change={{ value: `From ${dashboardData.transactions.length} payouts`, isPositive: true }}
          />
          
          <StatCard 
            title="Active Cycles"
            value={`${dashboardData.activeCycles}`}
            change={{ value: `${dashboardData.cycles.length} total cycles`, isPositive: true }}
          />
          
          <StatCard 
            title="Recycled Material"
            value={`${dashboardData.totalRecycled.toFixed(0)} kg`}
            change={{ value: "Reducing carbon footprint", isPositive: true }}
            subtitle="environmental impact"
          />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
          {/* Left Column - Charts and Lists */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-3 md:p-4 lg:p-6">
              <h2 className="text-lg font-semibold mb-3 md:mb-4">Profit Overview</h2>
              <ProfitChart userId={user?.id ?? ''} />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-3 md:p-4 lg:p-6">
              <h2 className="text-lg font-semibold mb-3 md:mb-4">Recent Transactions</h2>
              <RecentTransactions />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-3 md:p-4 lg:p-6">
              <h2 className="text-lg font-semibold mb-3 md:mb-4">Project Updates</h2>
              <ProjectNews />
            </div>
          </div>

          {/* Right Column - Quick Actions and Progress */}
          <div className="space-y-3 md:space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-3 md:p-4 lg:p-6">
              <h2 className="text-lg font-semibold mb-3 md:mb-4">Tips & Best Practices</h2>
              <TipsAndBestPractices 
                totalInvestment={dashboardData.totalInvestment}
                totalRecycled={dashboardData.totalRecycled} 
              />
            </div>

            {levelData && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-3 md:p-4 lg:p-6">
                <h2 className="text-lg font-semibold mb-3 md:mb-4">Investor Level</h2>
                <UserLevel 
                  level={levelData.level} 
                  progress={levelData.currentXP} 
                  nextLevelThreshold={levelData.nextLevelXP} 
                />
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-3 md:p-4 lg:p-6">
              <h2 className="text-lg font-semibold mb-3 md:mb-4">Current Cycle Progress</h2>
              {dashboardData.activeCycle ? (
                <CycleProgress cycle={dashboardData.activeCycle} />
              ) : (
                <div className="text-center py-4">
                  <p className="text-slate-500">No active cycle found</p>
                  <p className="text-sm text-slate-400 mt-1">Start a new investment to begin your recycling journey</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
