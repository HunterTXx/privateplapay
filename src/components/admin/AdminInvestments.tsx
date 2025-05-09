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
import { Loader, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';

const AdminInvestments = () => {
  const [actionDialog, setActionDialog] = React.useState({ open: false, investment: null, status: '' });
  const [updating, setUpdating] = React.useState(false);

  const fetchInvestments = async () => {
    // First fetch all investments
    const { data: investments, error } = await supabase
      .from('investments')
      .select('*')
      .order('creation_date', { ascending: false });
      
    if (error) throw error;
    
    // Then fetch profiles for each investment
    const investmentsWithProfiles = await Promise.all(
      (investments || []).map(async (investment) => {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('email, avatar_url')
          .eq('id', investment.user_id)
          .single();
          
        return {
          ...investment,
          profile: profileData || { email: investment.user_id, avatar_url: null }
        };
      })
    );
    
    return investmentsWithProfiles || [];
  };

  const { data: investments = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-investments'],
    queryFn: fetchInvestments,
  });

  const handleStatusChange = (investment, status) => {
    setActionDialog({ open: true, investment, status });
  };

  const confirmStatusChange = async () => {
    if (!actionDialog.investment) return;
    setUpdating(true);
    await supabase
      .from('investments')
      .update({ status: actionDialog.status })
      .eq('id', actionDialog.investment.id);
    setUpdating(false);
    setActionDialog({ open: false, investment: null, status: '' });
    refetch();
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
          <h3 className="text-red-800 font-medium">Error loading investments</h3>
          <p className="text-red-700 text-sm">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">All Investments</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Cycles</TableHead>
            <TableHead>Return Rate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Creation Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment) => (
            <TableRow key={investment.id}>
              <TableCell>
                {investment.profile?.email || investment.user_id}
              </TableCell>
              <TableCell>${investment.amount.toFixed(2)}</TableCell>
              <TableCell>{investment.cycles}</TableCell>
              <TableCell>{investment.cycle_return_rate}% per cycle</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${
                    investment.status === 'active'
                      ? 'bg-green-100 text-green-800 hover:bg-green-100'
                      : investment.status === 'completed'
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                  }`}
                >
                  {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{new Date(investment.creation_date).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(investment.end_date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleStatusChange(investment, 'completed')} disabled={investment.status === 'completed'}>
                  Mark Completed
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleStatusChange(investment, 'failed')} disabled={investment.status === 'failed'} className="ml-2">
                  Mark Failed
                </Button>
                <Button variant="destructive" size="sm" className="ml-2" onClick={async () => {
                  if (!window.confirm('Are you sure you want to delete this investment and all related cycles and transactions?')) return;
                  // Delete related transactions
                  const { error: txError } = await supabase.from('transactions').delete().eq('investment_id', investment.id);
                  if (txError) {
                    console.error('Failed to delete related transactions:', txError);
                    alert('Failed to delete related transactions: ' + (txError.message || JSON.stringify(txError)));
                    return;
                  }
                  // Delete related cycles
                  const { error: cyclesError } = await supabase.from('cycles').delete().eq('investment_id', investment.id);
                  if (cyclesError) {
                    console.error('Failed to delete related cycles:', cyclesError);
                    alert('Failed to delete related cycles: ' + (cyclesError.message || JSON.stringify(cyclesError)));
                    return;
                  }
                  // Delete the investment
                  const { error: invError } = await supabase.from('investments').delete().eq('id', investment.id);
                  if (invError) {
                    console.error('Failed to delete investment:', invError);
                    alert('Failed to delete investment: ' + (invError.message || JSON.stringify(invError)));
                    return;
                  }
                  refetch();
                  alert('Investment and all related data removed.');
                }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={actionDialog.open} onOpenChange={open => setActionDialog({ ...actionDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to mark this investment as <b>{actionDialog.status}</b>?</p>
          <DialogFooter>
            <Button onClick={confirmStatusChange} disabled={updating}>
              {updating ? 'Updating...' : 'Yes, Confirm'}
            </Button>
            <Button variant="outline" onClick={() => setActionDialog({ open: false, investment: null, status: '' })} disabled={updating}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInvestments;
