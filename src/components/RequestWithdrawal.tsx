import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useAccurateDepositBalance } from '@/hooks/useAccurateDepositBalance';

interface RequestWithdrawalProps {
  onRequestSuccess?: () => void;
}

const RequestWithdrawal: React.FC<RequestWithdrawalProps> = ({ onRequestSuccess }) => {
  const { user } = useAuth();
  const balance = useAccurateDepositBalance(user?.id);
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Enter a valid amount.');
      return;
    }
    if (balance === null || Number(amount) > balance) {
      setError('Amount exceeds available balance.');
      return;
    }
    if (!wallet) {
      setError('Enter a wallet address.');
      return;
    }
    setLoading(true);
    const { error } = await (supabase as any)
      .from('withdrawal_requests')
      .insert([{ user_id: user.id, amount: Number(amount), wallet_address: wallet, status: 'pending' }]);
    setLoading(false);
    if (error) setError(error.message);
    else {
      setSuccess('Withdrawal request submitted!');
      setAmount('');
      if (onRequestSuccess) onRequestSuccess();
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 w-full md:max-w-md md:mx-auto">
      <h2 className="text-lg font-semibold mb-4">Request Withdrawal</h2>
      <div className="mb-2 text-slate-700">Deposit Balance: <span className="font-bold">${balance?.toFixed(2) ?? '...'}</span></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Amount</label>
          <input
            type="number"
            min="1"
            max={balance ?? undefined}
            step="0.01"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter amount"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Wallet Address</label>
          <input
            type="text"
            value={wallet}
            onChange={e => setWallet(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter wallet address"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button type="submit" className="bg-investment-green text-white rounded px-4 py-2 w-full" disabled={loading}>
          {loading ? 'Submitting...' : 'Request Withdrawal'}
        </button>
      </form>
    </div>
  );
};

export default RequestWithdrawal; 