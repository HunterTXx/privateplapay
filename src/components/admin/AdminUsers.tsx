import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Shield, ShieldOff, Loader, AlertCircle } from 'lucide-react';
import { addAdmin, removeAdmin } from '@/utils/adminUtils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface User {
  id: string;
  email: string | null;
  created_at: string;
  is_admin: boolean;
}

const AdminUsers = () => {
  const { toast } = useToast();
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [balanceDialog, setBalanceDialog] = useState({ open: false, user: null });
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustReason, setAdjustReason] = useState('');
  const [adjustType, setAdjustType] = useState('add');
  const [adjusting, setAdjusting] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState({ open: false, user: null, profile: null, investments: [], transactions: [] });

  const fetchUsers = async () => {
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id, created_at, deposit_balance, email, full_name')
      .order('created_at', { ascending: false });

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return [];
    }
    if (!Array.isArray(users)) {
      console.error('Profiles query did not return an array:', users);
      return [];
    }

    const usersWithAdminStatus = await Promise.all(
      users.map(async (user) => {
        const { data: isAdmin } = await supabase.rpc('is_admin', { user_id: user.id });
        // Validate email format simple regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailToShow = user.email;
        if (!emailToShow || !emailRegex.test(emailToShow)) {
          emailToShow = null; // Treat invalid email as null
        }
        return {
          ...user,
          email: emailToShow || 'No email',
          is_admin: isAdmin || false
        };
      })
    );
    
    return usersWithAdminStatus;
  };

  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: fetchUsers,
    retry: false,
  });

  const handleToggleAdmin = async (user: User) => {
    setSelectedUser(user);
    setIsAdminDialogOpen(true);
  };

  const confirmToggleAdmin = async () => {
    if (!selectedUser) return;

    try {
      let success;
      if (selectedUser.is_admin) {
        success = await removeAdmin(selectedUser.id);
        if (success) {
          toast({
            title: "Admin Rights Removed",
            description: `${selectedUser.email || 'No email'} is no longer an admin`,
          });
        }
      } else {
        success = await addAdmin(selectedUser.id);
        if (success) {
          toast({
            title: "Admin Rights Granted",
            description: `${selectedUser.email || 'No email'} is now an admin`,
          });
        }
      }

      if (success) {
        refetch();
      } else {
        toast({
          title: "Error",
          description: "Failed to update admin status",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error toggling admin status:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsAdminDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleAdjustBalance = (user: User) => {
    setBalanceDialog({ open: true, user });
    setAdjustAmount('');
    setAdjustReason('');
    setAdjustType('add');
  };

  const confirmAdjustBalance = async () => {
    if (!balanceDialog.user || !adjustAmount || isNaN(Number(adjustAmount))) return;
    setAdjusting(true);
    const amount = adjustType === 'add' ? Math.abs(Number(adjustAmount)) : -Math.abs(Number(adjustAmount));
    const { data: userProfile, error: profileError } = await supabase.from('profiles').select('deposit_balance').eq('id', balanceDialog.user.id).single();
    if (profileError || !userProfile || typeof userProfile.deposit_balance !== 'number') {
      setAdjusting(false);
      toast({ title: 'Error', description: 'Failed to fetch user balance', variant: 'destructive' });
      return;
    }
    const newBalance = (userProfile?.deposit_balance || 0) + amount;
    await supabase.from('profiles').update({ deposit_balance: newBalance }).eq('id', balanceDialog.user.id);
    await supabase.from('transactions').insert({
      user_id: balanceDialog.user.id,
      amount: Math.abs(Number(adjustAmount)),
      type: adjustType === 'add' ? 'deposit' : 'withdrawal',
      status: 'completed',
      description: `Admin adjustment: ${adjustType === 'add' ? 'add' : 'subtract'}${adjustReason ? ' - ' + adjustReason : ''}`,
    });
    setAdjusting(false);
    setBalanceDialog({ open: false, user: null });
    refetch();
    toast({ title: 'Balance adjusted', description: `User balance updated successfully.` });
  };

  const handleRowClick = async (user) => {
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    const { data: investments } = await supabase.from('investments').select('*').eq('user_id', user.id).order('creation_date', { ascending: false });
    const { data: transactions } = await supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    setDetailsDialog({ open: true, user, profile, investments: investments || [], transactions: transactions || [] });
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
          <h3 className="text-red-800 font-medium">Error loading users</h3>
          <p className="text-red-700 text-sm">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Admin Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="cursor-pointer hover:bg-slate-50" onClick={() => handleRowClick(user)}>
              <TableCell>{user.email || 'No email available'}</TableCell>
              <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
              <TableCell>{user.is_admin ? <Shield className="text-green-600 inline" /> : <ShieldOff className="text-gray-400 inline" />}</TableCell>
              <TableCell>
                <Button size="sm" variant="outline" onClick={e => { e.stopPropagation(); handleToggleAdmin(user); }}>{user.is_admin ? 'Remove Admin' : 'Make Admin'}</Button>
                <Button size="sm" variant="outline" className="ml-2" onClick={e => { e.stopPropagation(); handleAdjustBalance(user); }}>Adjust Balance</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser?.is_admin
                ? `Remove Admin Rights from ${selectedUser?.email || 'No email'}?`
                : `Grant Admin Rights to ${selectedUser?.email || 'No email'}?`}
            </DialogTitle>
          </DialogHeader>
          <p className="py-4">
            {selectedUser?.is_admin
              ? "This user will no longer have administrative privileges."
              : "This user will have full administrative access to the platform."}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdminDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={selectedUser?.is_admin ? "destructive" : "default"}
              onClick={confirmToggleAdmin}
            >
              {selectedUser?.is_admin ? "Remove Admin" : "Grant Admin"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={balanceDialog.open} onOpenChange={open => setBalanceDialog({ ...balanceDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust User Balance</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <Input type="number" value={adjustAmount} onChange={e => setAdjustAmount(e.target.value)} min="0" step="0.01" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select className="w-full border rounded-md p-2" value={adjustType} onChange={e => setAdjustType(e.target.value)}>
                <option value="add">Add</option>
                <option value="subtract">Subtract</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reason/Notes</label>
              <Textarea value={adjustReason} onChange={e => setAdjustReason(e.target.value)} placeholder="Reason for adjustment (required)" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={confirmAdjustBalance} disabled={adjusting || !adjustAmount || !adjustReason}>
              {adjusting ? 'Adjusting...' : 'Confirm'}
            </Button>
            <Button variant="outline" onClick={() => setBalanceDialog({ open: false, user: null })} disabled={adjusting}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={detailsDialog.open} onOpenChange={open => setDetailsDialog(d => ({ ...d, open }))}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {detailsDialog.profile && (
            <div className="mb-4">
              <div className="font-medium mb-1">Profile Info</div>
              <div className="text-xs text-slate-700 mb-2">ID: {detailsDialog.profile.id}</div>
              <div className="text-xs text-slate-700 mb-2">Email: {detailsDialog.profile.email || detailsDialog.user.email || 'No email available'}</div>
              <div className="text-xs text-slate-700 mb-2">Created: {new Date(detailsDialog.profile.created_at).toLocaleString()}</div>
              <div className="text-xs text-slate-700 mb-2">Deposit Balance: ${detailsDialog.profile.deposit_balance.toFixed(2)}</div>
            </div>
          )}
          <div className="mb-4">
            <div className="font-medium mb-1">Investments</div>
            {detailsDialog.investments.length > 0 ? (
              <ul className="text-xs text-slate-700 list-disc ml-4">
                {detailsDialog.investments.map(inv => (
                  <li key={inv.id} className="flex items-center justify-between">
                    <span>${inv.amount} | {inv.cycles} cycles | Status: {inv.status} | Created: {new Date(inv.creation_date).toLocaleDateString()}</span>
                    <Button size="sm" variant="destructive" className="ml-2" onClick={async () => {
                      if (!window.confirm('Are you sure you want to delete this investment and all related cycles and transactions?')) return;
                      await supabase.from('transactions').delete().eq('investment_id', inv.id);
                      await supabase.from('cycles').delete().eq('investment_id', inv.id);
                      await supabase.from('investments').delete().eq('id', inv.id);
                      handleRowClick(detailsDialog.user);
                      toast({ title: 'Investment deleted', description: 'Investment and all related data removed.' });
                    }}>
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            ) : <div className="text-xs text-slate-400">No investments</div>}
          </div>
          <div>
            <div className="font-medium mb-1">Transactions</div>
            {detailsDialog.transactions.length > 0 ? (
              <ul className="text-xs text-slate-700 list-disc ml-4 max-h-32 overflow-y-auto">
                {detailsDialog.transactions.map(tx => (
                  <li key={tx.id}>${tx.amount} | {tx.type} | {tx.status} | {new Date(tx.created_at).toLocaleDateString()}</li>
                ))}
              </ul>
            ) : <div className="text-xs text-slate-400">No transactions</div>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsDialog(d => ({ ...d, open: false }))}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
