import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';

interface InvestmentsHeaderProps {
  onOpenNewInvestment: () => void;
  openNewInvestment: boolean;
}

const InvestmentsHeader: React.FC<InvestmentsHeaderProps> = ({ 
  onOpenNewInvestment, 
  openNewInvestment 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <div className="text-center sm:text-left w-full">
        <h1 className="text-2xl font-bold">Your Investments</h1>
        <p className="text-slate-500">Manage and track all your active investment cycles</p>
      </div>
      <div className="flex justify-center sm:justify-end w-full sm:w-auto">
        <Button 
          className="bg-investment-green hover:bg-green-600"
          onClick={onOpenNewInvestment}
        >
          <PlusCircle className="w-4 h-4 mr-2" /> New Investment
        </Button>
      </div>
    </div>
  );
};

export default InvestmentsHeader;
