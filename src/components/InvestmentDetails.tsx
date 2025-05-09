import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, Coins, TrendingUp, AlertCircle, Loader, Trophy } from 'lucide-react';

interface InvestmentProps {
  investment: {
    id: string;
    amount: number;
    cycles: number;
    cycle_return_rate: number;
    status: string;
    creation_date: string;
    next_payout_date: string;
    end_date: string;
  };
}

interface Cycle {
  id: string;
  investment_id: string;
  cycle_number: number;
  start_date: string;
  end_date: string;
  status: string;
  amount: number;
  profit: number;
}

const InvestmentDetails: React.FC<InvestmentProps> = ({ investment }) => {
  const fetchCycles = async () => {
    const { data, error } = await supabase
      .from('cycles')
      .select('*')
      .eq('investment_id', investment.id)
      .order('cycle_number', { ascending: true });

    if (error) {
      throw error;
    }

    return data || [];
  };

  const { data: cycles = [], isLoading, error } = useQuery({
    queryKey: ['investmentCycles', investment.id],
    queryFn: fetchCycles,
  });

  // Calculate days remaining in the current investment
  const calculateDaysRemaining = () => {
    const endDate = new Date(investment.end_date);
    const today = new Date();
    const diffTime = Math.max(0, endDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const startDate = new Date(investment.creation_date);
    const endDate = new Date(investment.end_date);
    const today = new Date();
    
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = today.getTime() - startDate.getTime();
    
    return Math.min(100, Math.max(0, Math.floor((elapsed / totalDuration) * 100)));
  };

  // Calculate total profit to date from completed cycles
  const calculateProfitToDate = () => {
    return cycles
      .filter(cycle => cycle.status === 'completed')
      .reduce((sum, cycle) => sum + cycle.profit, 0);
  };

  // Calculate total expected profit
  const calculateTotalExpectedProfit = () => {
    return investment.amount * (investment.cycle_return_rate / 100) * investment.cycles;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader className="h-6 w-6 animate-spin text-investment-green" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2" />
        <div>
          <h3 className="font-medium text-red-800">Error loading investment details</h3>
          <p className="text-sm text-red-700">Please try again later</p>
        </div>
      </div>
    );
  }

  const daysRemaining = calculateDaysRemaining();
  const progress = calculateProgress();
  const profitToDate = calculateProfitToDate();
  const totalExpectedProfit = calculateTotalExpectedProfit();

  const completedCycles = cycles.filter(cycle => cycle.status === 'completed').length;
  const initialXP = Math.floor(investment.amount / 10);
  const earnedCycleXP = completedCycles * 20;
  const upcomingCycleXP = (investment.cycles - completedCycles) * 20;
  const fullCompletionXP = investment.cycles * 20;

  return (
    <div className="space-y-6 py-4">
      {/* Investment summary */}
      <div className="bg-slate-50 p-4 rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Investment Amount</p>
            <p className="text-xl font-bold">${investment.amount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Status</p>
            <p className={`text-lg font-medium ${
              investment.status === 'active' ? 'text-green-600' : 
              investment.status === 'completed' ? 'text-blue-600' : 'text-yellow-600'
            }`}>
              {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Progress and timeframe */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium flex items-center"><Clock className="w-4 h-4 mr-1" /> Investment Progress</h3>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-slate-500">
          <span>{new Date(investment.creation_date).toLocaleDateString()}</span>
          <span>{new Date(investment.end_date).toLocaleDateString()}</span>
        </div>
        <div className="bg-investment-green bg-opacity-10 p-3 rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-investment-green mr-2" />
              <span className="text-sm">Days Remaining:</span>
            </div>
            <span className="font-medium">{daysRemaining} days</span>
          </div>
        </div>
      </div>

      {/* Financial details */}
      <div className="space-y-4">
        <h3 className="font-medium flex items-center">
          <TrendingUp className="w-4 h-4 mr-1" /> Return Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm text-slate-500">Return Rate</p>
            <p className="text-lg font-medium text-investment-green">
              {investment.cycle_return_rate}% per cycle
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm text-slate-500">Total Cycles</p>
            <p className="text-lg font-medium">
              {investment.cycles} cycles
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm text-slate-500">Profit to Date</p>
            <p className="text-lg font-medium text-investment-green">
              ${profitToDate.toFixed(2)}
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm text-slate-500">Expected Total Profit</p>
            <p className="text-lg font-medium text-investment-green">
              ${totalExpectedProfit.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="bg-slate-50 p-3 rounded-md">
          <p className="text-sm text-slate-500">Total Expected Return</p>
          <p className="text-xl font-bold text-investment-green">
            ${(investment.amount + totalExpectedProfit).toFixed(2)}
          </p>
        </div>

        {/* Level rewards */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center">
            <Trophy className="w-4 h-4 mr-1 text-amber-500" /> Investment Rewards
          </h3>
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-md">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-amber-100 rounded-full">
                <Trophy className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="font-medium">Earn XP with this investment</p>
                <p className="text-sm text-amber-700 mt-1">
                  This ${investment.amount.toFixed(2)} investment earns you {Math.floor(investment.amount / 10)} XP instantly
                  plus {investment.cycles * 20} XP when all cycles complete.
                </p>
                <div className="mt-3">
                  <div className="text-xs font-medium text-amber-800">XP Rewards</div>
                  <ul className="mt-1 text-xs text-amber-700 space-y-1">
                    <li className="flex justify-between items-center">
                      <span>• Initial investment:</span> 
                      <span className="font-medium flex items-center gap-2">{initialXP} XP <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-[10px]">Earned</span></span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>• Per completed cycle:</span>
                      <span className="font-medium flex items-center gap-2">{earnedCycleXP} XP <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-[10px]">Earned</span></span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>• Upcoming cycles:</span>
                      <span className="font-medium flex items-center gap-2">{upcomingCycleXP} XP <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 text-[10px]">Upcoming</span></span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>• Full investment completion:</span>
                      <span className="font-medium flex items-center gap-2">{fullCompletionXP} XP <span className={`px-2 py-0.5 rounded text-[10px] ${completedCycles === investment.cycles ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{completedCycles === investment.cycles ? 'Earned' : 'Upcoming'}</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cycles */}
      <div className="space-y-4">
        <h3 className="font-medium flex items-center">
          <Coins className="w-4 h-4 mr-1" /> Investment Cycles ({cycles.length})
        </h3>
        <div className="border rounded-md overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-slate-500">Cycle</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-slate-500">Status</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-slate-500">End Date</th>
                  <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-slate-500">Profit</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cycles.map((cycle) => (
                  <tr key={cycle.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">#{cycle.cycle_number}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        cycle.status === 'active' ? 'bg-green-100 text-green-800' : 
                        cycle.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {cycle.status.charAt(0).toUpperCase() + cycle.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      {new Date(cycle.end_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-right font-medium text-investment-green">
                      ${cycle.profit.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetails;
