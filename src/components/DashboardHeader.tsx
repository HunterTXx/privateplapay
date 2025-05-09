import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useState } from 'react';
import Deposit from '@/components/Deposit';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardHeader: React.FC = () => {
  const [openDepositSheet, setOpenDepositSheet] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <h1 className="text-2xl font-bold text-center sm:text-left w-full">Dashboard</h1>
      <div className="flex gap-2 sm:gap-3 justify-center sm:justify-end w-full">
        <Sheet open={openDepositSheet} onOpenChange={setOpenDepositSheet}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              className="bg-investment-blue text-white border-none hover:bg-blue-600"
            >
              Deposit
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Deposit Funds</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <Deposit onSuccess={() => setOpenDepositSheet(false)} />
            </div>
          </SheetContent>
        </Sheet>
        
        <Button 
          size={isMobile ? "sm" : "default"}
          className="bg-investment-green hover:bg-green-600" 
          asChild
        >
          <Link to="/investments">New Investment</Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
