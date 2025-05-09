import React from 'react';
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

const AdminDeposits = () => {
  const { toast } = useToast();
  
  const fetchDeposits = async () => {
    // First fetch the deposits
    const { data: deposits, error } = await supabase
      .from('deposits')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Then fetch the profiles for each deposit
    const depositsWithProfiles = await Promise.all(
      (deposits || []).map(async (deposit) => {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('email')
          .eq('id', deposit.user_id)
          .single();
          
        return {
          ...deposit,
          profile_name: profileData?.email || deposit.user_id
        };
      })
    );
    
    return depositsWithProfiles || [];
  };

  const { data: deposits = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-deposits'],
    queryFn: fetchDeposits,
  });

  const handleApprove = async (id: string) => {
    try {
      // 1. Get the deposit details to reference in transaction update
      const { data: deposit, error: fetchError } = await supabase
        .from('deposits')
        .select('*')
        .eq('id', id)
        .single();
        
      if (fetchError) throw fetchError;
      
      // 2. Update the deposit status to approved
      const { error: updateError } = await supabase
        .from('deposits')
        .update({ status: 'approved' })
        .eq('id', id);
        
      if (updateError) throw updateError;
      
      // 3. Update the corresponding transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .update({ 
          status: 'completed',
          description: 'Deposit approved'
        })
        .eq('user_id', deposit.user_id)
        .eq('type', 'deposit')
        .eq('amount', deposit.amount)
        .eq('status', 'pending');
        
      if (transactionError) throw transactionError;
      
      // 4. Update the user's deposit balance
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('deposit_balance')
        .eq('id', deposit.user_id)
        .single();
        
      if (profileError) throw profileError;
      
      const newBalance = (profile?.deposit_balance || 0) + deposit.amount;
      
      const { error: balanceError } = await supabase
        .from('profiles')
        .update({ deposit_balance: newBalance })
        .eq('id', deposit.user_id);
        
      if (balanceError) throw balanceError;
      
      toast({
        title: "Deposit Approved",
        description: "The deposit has been approved and user's balance updated",
      });
      
      refetch();
    } catch (err) {
      console.error("Error approving deposit:", err);
      toast({
        title: "Error",
        description: "Failed to approve deposit",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      // 1. Get the deposit details to reference in transaction update
      const { data: deposit, error: fetchError } = await supabase
        .from('deposits')
        .select('*')
        .eq('id', id)
        .single();
        
      if (fetchError) throw fetchError;
      
      // 2. Update the deposit status to rejected
      const { error: updateError } = await supabase
        .from('deposits')
        .update({ status: 'rejected' })
        .eq('id', id);
        
      if (updateError) throw updateError;
      
      // 3. Update the corresponding transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .update({ 
          status: 'rejected',
          description: 'Deposit rejected'
        })
        .eq('user_id', deposit.user_id)
        .eq('type', 'deposit')
        .eq('amount', deposit.amount)
        .eq('status', 'pending');
        
      if (transactionError) throw transactionError;
      
      toast({
        title: "Deposit Rejected",
        description: "The deposit has been rejected",
      });
      
      refetch();
    } catch (err) {
      console.error("Error rejecting deposit:", err);
      toast({
        title: "Error",
        description: "Failed to reject deposit",
        variant: "destructive",
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
          <h3 className="text-red-800 font-medium">Error loading deposits</h3>
          <p className="text-red-700 text-sm">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Deposits</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Transaction Reference</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deposits.map((deposit) => (
            <TableRow key={deposit.id}>
              <TableCell>
                {deposit.profile_name}
              </TableCell>
              <TableCell>${deposit.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    deposit.status === 'approved'
                      ? 'bg-green-100 text-green-800 hover:bg-green-100'
                      : deposit.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                      : 'bg-red-100 text-red-800 hover:bg-red-100'
                  }
                >
                  {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{deposit.tx_reference}</TableCell>
              <TableCell>{new Date(deposit.created_at).toLocaleString()}</TableCell>
              <TableCell>
                {deposit.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => handleApprove(deposit.id)}
                    >
                      <Check className="h-4 w-4 mr-1" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => handleReject(deposit.id)}
                    >
                      <X className="h-4 w-4 mr-1" /> Reject
                    </Button>
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

export default AdminDeposits;
