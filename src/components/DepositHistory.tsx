import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface DepositHistoryProps {
  refresh?: number;
}

const DepositHistory: React.FC<DepositHistoryProps> = ({ refresh }) => {
  const { user } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      const { data, error } = await (supabase as any)
        .from('deposits')
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
      <h3 className="text-md font-semibold mb-2">Deposit History</h3>
      {loading ? (
        <div>Loading...</div>
      ) : history.length === 0 ? (
        <div className="text-slate-500">No deposit requests yet.</div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-2 py-1 text-left">Amount</th>
                <th className="px-2 py-1 text-left">Status</th>
                <th className="px-2 py-1 text-left">Reference</th>
                <th className="px-2 py-1 text-left">Requested</th>
              </tr>
            </thead>
            <tbody>
              {history.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="px-2 py-1">${d.amount.toFixed(2)}</td>
                  <td className="px-2 py-1">
                    <span className={
                      d.status === 'approved'
                        ? 'text-green-600'
                        : d.status === 'pending'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }>
                      {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-2 py-1">{d.tx_reference}</td>
                  <td className="px-2 py-1">{new Date(d.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DepositHistory; 