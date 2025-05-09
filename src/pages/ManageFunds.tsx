import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Deposit from '@/components/Deposit';
import DepositHistory from '@/components/DepositHistory';
import RequestWithdrawal from '@/components/RequestWithdrawal';
import WithdrawalHistory from '@/components/WithdrawalHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ManageFunds = () => {
  const [refreshDeposits, setRefreshDeposits] = useState(0);
  const [refreshWithdrawals, setRefreshWithdrawals] = useState(0);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 w-full overflow-x-hidden p-0 md:p-8">
        <h1 className="text-2xl font-bold text-center md:text-left mb-4 md:mb-8">Manage Funds</h1>
        <Tabs defaultValue="deposit" className="w-full md:max-w-2xl md:mx-auto">
          <TabsList className="w-full flex flex-wrap gap-2 mb-4">
            <TabsTrigger value="deposit" className="flex-1 min-w-[120px]">Deposit Funds</TabsTrigger>
            <TabsTrigger value="withdraw" className="flex-1 min-w-[120px]">Withdraw Funds</TabsTrigger>
          </TabsList>
          <TabsContent value="deposit">
            <div className="w-full md:max-w-xl md:mx-auto">
              <Deposit onSuccess={() => setRefreshDeposits(r => r + 1)} />
              <DepositHistory refresh={refreshDeposits} />
            </div>
          </TabsContent>
          <TabsContent value="withdraw">
            <div className="w-full md:max-w-xl md:mx-auto">
              <RequestWithdrawal onRequestSuccess={() => setRefreshWithdrawals(r => r + 1)} />
              <WithdrawalHistory refresh={refreshWithdrawals} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageFunds; 