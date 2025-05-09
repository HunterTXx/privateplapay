import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface WithdrawalHistoryProps {
  refresh?: number;
}

const WithdrawalHistory: React.FC<WithdrawalHistoryProps> = ({ refresh }) => {
  const { user } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      const { data, error } = await (supabase as any)
        .from('withdrawal_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setHistory(data || []);
      setLoading(false);
    };
    fetchHistory();
  }, [user, refresh]);

  if (!user) return null;

  return (
    <div className="mt-8">
      <h3 className="text-md font-semibold mb-2">Withdrawal History</h3>
      {loading ? (
        <div>Loading...</div>
      ) : history.length === 0 ? (
        <div className="text-slate-500">No withdrawal requests yet.</div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-2 py-1 text-left">Amount</th>
                <th className="px-2 py-1 text-left">Wallet</th>
                <th className="px-2 py-1 text-left">Status</th>
                <th className="px-2 py-1 text-left">Requested</th>
                <th className="px-2 py-1 text-left">Admin Notes</th>
              </tr>
            </thead>
            <tbody>
              {history.map((w) => (
                <tr key={w.id} className="border-t">
                  <td className="px-2 py-1">${w.amount.toFixed(2)}</td>
                  <td className="px-2 py-1">{w.wallet_address}</td>
                  <td className="px-2 py-1">
                    <span className={
                      w.status === 'approved'
                        ? 'text-green-600'
                        : w.status === 'pending'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }>
                      {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-2 py-1">{new Date(w.created_at).toLocaleString()}</td>
                  <td className="px-2 py-1">{w.admin_notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WithdrawalHistory; 