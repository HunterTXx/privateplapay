import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader, AlertCircle, Check, X } from 'lucide-react';

const AdminWithdrawals = () => {
  const { toast } = useToast();
  const [adminNotes, setAdminNotes] = useState<{ [id: string]: string }>({});
  
  const fetchWithdrawals = async () => {
    const { data: withdrawals, error } = await supabase
      .from('withdrawal_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    const withdrawalsWithProfiles = await Promise.all(
      (withdrawals || []).map(async (withdrawal) => {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('email')
          .eq('id', withdrawal.user_id)
          .single();
        return {
          ...withdrawal,
          profile_name: profileData?.email || withdrawal.user_id
        };
      })
    );
    return withdrawalsWithProfiles || [];
  };

  const { data: withdrawals = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-withdrawals'],
    queryFn: fetchWithdrawals,
  });

  const handleApprove = async (id: string, user_id: string, amount: number, note: string) => {
    try {
      // 1. Approve the withdrawal request
      const { error: approveError } = await (supabase as any)
        .from('withdrawal_requests')
        .update({ status: 'approved', processed_at: new Date().toISOString(), admin_notes: note })
        .eq('id', id);
      if (approveError) throw approveError;

      // 2. Get user's current balances
      const { data: profile, error: profileError } = await (supabase as any)
        .from('profiles')
        .select('deposit_balance, withdraw_balance')
        .eq('id', user_id)
        .single();
      if (profileError) throw profileError;
      
      // 3. Calculate new balances
      const newDepositBalance = (profile?.deposit_balance || 0) - amount;
      const newWithdrawBalance = (profile?.withdraw_balance || 0) + amount;
      
      if (newDepositBalance < 0) throw new Error('Insufficient balance for withdrawal.');
      
      // 4. Update both balances in the user's profile
      const { error: updateError } = await (supabase as any)
        .from('profiles')
        .update({ 
          deposit_balance: newDepositBalance,
          withdraw_balance: newWithdrawBalance
        })
        .eq('id', user_id);
      if (updateError) throw updateError;

      toast({
        title: 'Withdrawal Approved',
        description: 'The withdrawal has been approved and balances updated.',
      });
      setAdminNotes((prev) => ({ ...prev, [id]: '' }));
      refetch();
    } catch (err) {
      console.error('Error approving withdrawal:', err);
      toast({
        title: 'Error',
        description: 'Failed to approve withdrawal or update balance.',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async (id: string, note: string) => {
    try {
      const { error } = await (supabase as any)
        .from('withdrawal_requests')
        .update({ status: 'rejected', processed_at: new Date().toISOString(), admin_notes: note })
        .eq('id', id);
      if (error) throw error;
      toast({
        title: 'Withdrawal Rejected',
        description: 'The withdrawal has been rejected',
      });
      setAdminNotes((prev) => ({ ...prev, [id]: '' }));
      refetch();
    } catch (err) {
      console.error('Error rejecting withdrawal:', err);
      toast({
        title: 'Error',
        description: 'Failed to reject withdrawal',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader className="h-8 w-8 animate-spin text-investment-green" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md flex items-start">
        <AlertCircle className="text-red-600 mt-0.5 mr-2 h-5 w-5" />
        <div>
          <h3 className="text-red-800 font-medium">Error loading withdrawals</h3>
          <p className="text-red-700 text-sm">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Withdrawals</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Wallet Address</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Admin Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawals.map((withdrawal) => (
            <TableRow key={withdrawal.id}>
              <TableCell>{withdrawal.profile_name}</TableCell>
              <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    withdrawal.status === 'approved'
                      ? 'bg-green-100 text-green-800 hover:bg-green-100'
                      : withdrawal.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                      : 'bg-red-100 text-red-800 hover:bg-red-100'
                  }
                >
                  {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{withdrawal.wallet_address}</TableCell>
              <TableCell>{new Date(withdrawal.created_at).toLocaleString()}</TableCell>
              <TableCell>{withdrawal.admin_notes || '-'}</TableCell>
              <TableCell>
                {withdrawal.status === 'pending' && (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Admin notes (optional)"
                      value={adminNotes[withdrawal.id] || ''}
                      onChange={e => setAdminNotes({ ...adminNotes, [withdrawal.id]: e.target.value })}
                      className="border rounded px-2 py-1 text-sm mb-1"
                      style={{ minWidth: 0 }}
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                        onClick={() => handleApprove(withdrawal.id, withdrawal.user_id, withdrawal.amount, adminNotes[withdrawal.id] || '')}
                      >
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => handleReject(withdrawal.id, adminNotes[withdrawal.id] || '')}
                      >
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminWithdrawals; 