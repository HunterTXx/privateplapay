import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, Copy } from 'lucide-react';
import { useAccurateDepositBalance } from '@/hooks/useAccurateDepositBalance';

interface DepositProps {
  onSuccess?: () => void;
}

const Deposit: React.FC<DepositProps> = ({ onSuccess }) => {
  const [depositAmount, setDepositAmount] = useState<string>("1000");
  const [transactionReference, setTransactionReference] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const depositBalance = useAccurateDepositBalance(user?.id);
  
  const walletAddress = "TBntaphfJWFU9JguutVHUeriVgqsBxJFws"; // USDT wallet address
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };
  
  const handleSubmitDeposit = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to make a deposit",
        variant: "destructive"
      });
      return;
    }
    
    if (!depositAmount || Number(depositAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive"
      });
      return;
    }
    
    if (!transactionReference.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide the transaction reference",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: depositData, error } = await supabase
        .from('deposits')
        .insert({
          user_id: user.id,
          amount: Number(depositAmount),
          tx_reference: transactionReference,
          status: 'pending',
          currency: 'USDT'
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Create a transaction record for the deposit
      await supabase.from('transactions').insert({
        user_id: user.id,
        amount: Number(depositAmount),
        type: 'deposit',
        status: 'pending',
        description: 'Deposit request submitted',
        created_at: new Date().toISOString(),
        // Optionally link deposit id if schema allows
        // deposit_id: depositData?.id
      });
      
      toast({
        title: "Deposit Request Submitted",
        description: "Your deposit request has been sent for approval",
      });
      
      setOpenDialog(false);
      setTransactionReference("");
      
      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Deposit failed:', error);
      toast({
        title: "Deposit Failed",
        description: "There was an error submitting your deposit request",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-5">
      <h2 className="text-lg font-semibold mb-2">Deposit Funds</h2>
      <p className="text-sm text-slate-500 mb-4">Add funds to your account</p>
      
      <div className="space-y-4 mb-6">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">Deposit Amount (USDT)</Label>
          <Input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="w-full"
            min="1"
          />
        </div>
      </div>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button 
            className="w-full bg-investment-green hover:bg-green-600"
          >
            Deposit Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Deposit</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="walletAddress">Send {depositAmount} USDT to this address:</Label>
              <div className="flex items-center">
                <div className="flex-1 bg-slate-50 p-3 rounded-l-md border border-r-0 border-slate-200 font-mono text-sm overflow-hidden">
                  {walletAddress}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-l-none border border-slate-200" 
                  onClick={handleCopyAddress}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-500">Only send USDT (TRC20) to this address</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reference">Transaction Reference/ID</Label>
              <Input 
                id="reference" 
                value={transactionReference}
                onChange={(e) => setTransactionReference(e.target.value)}
                placeholder="Enter the transaction ID or reference"
              />
              <p className="text-xs text-slate-500">Enter the transaction ID from your wallet or exchange</p>
            </div>
            
            <Button 
              className="w-full bg-investment-green hover:bg-green-600 mt-2" 
              onClick={handleSubmitDeposit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit Deposit Request"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Deposit;
