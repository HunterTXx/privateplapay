
import React from 'react';
import { ArrowUpRight, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CycleProgress from '@/components/CycleProgress';

interface Cycle {
  id: string;
  investment_id: string;
  user_id: string;
  cycle_number: number;
  start_date: string;
  end_date: string;
  amount: number;
  profit: number;
  status: 'active' | 'completed' | 'upcoming';
  materials_recycled: number | null;
}

interface CycleCardProps {
  cycle: Cycle;
  onViewDetails: (cycle: Cycle) => void;
}

const CycleCard: React.FC<CycleCardProps> = ({ cycle, onViewDetails }) => {
  const getStatusBadge = (status: 'active' | 'completed' | 'upcoming') => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" /> Active
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" /> Upcoming
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            <CheckCircle className="w-3 h-3 mr-1" /> Completed
          </Badge>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Cycle #{cycle.cycle_number}</h3>
          {getStatusBadge(cycle.status)}
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">Amount</p>
            <p className="font-medium">${cycle.amount.toFixed(2)}</p>
          </div>
          
          <div>
            <p className="text-sm text-slate-500">Expected Profit</p>
            <p className="font-medium text-investment-green">+${cycle.profit.toFixed(2)}</p>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-slate-500">Start Date</p>
              <p className="font-medium">{new Date(cycle.start_date).toLocaleDateString()}</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-slate-500">End Date</p>
              <p className="font-medium">{new Date(cycle.end_date).toLocaleDateString()}</p>
            </div>
          </div>
          
          {cycle.status === 'active' && (
            <div className="pt-2">
              <p className="text-sm text-slate-500 mb-2">Recycling Progress</p>
              <CycleProgress cycle={cycle} />
            </div>
          )}
          
          <div className="pt-2">
            <Button 
              onClick={() => onViewDetails(cycle)} 
              variant="outline" 
              className="w-full"
            >
              View Details <ArrowUpRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleCard;
