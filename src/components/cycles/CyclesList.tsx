import React from 'react';
import CycleCard from './CycleCard';

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

interface CyclesListProps {
  cycles: Cycle[];
  onViewDetails: (cycle: Cycle) => void;
}

const CyclesList: React.FC<CyclesListProps> = ({ cycles, onViewDetails }) => {
  console.log("Rendering CyclesList with cycles:", cycles);
  
  if (!cycles || cycles.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No cycles available</p>
      </div>
    );
  }

  // Deduplicate cycles based on cycle_number and investment_id
  const uniqueCycles = cycles.reduce<Cycle[]>((acc, current) => {
    const isDuplicate = acc.some(
      item => item.cycle_number === current.cycle_number && 
              item.investment_id === current.investment_id
    );
    if (!isDuplicate) {
      return [...acc, current];
    }
    return acc;
  }, []);

  console.log("Rendering unique cycles:", uniqueCycles);

  // Sort cycles by cycle_number ascending
  const sortedCycles = uniqueCycles.sort((a, b) => a.cycle_number - b.cycle_number);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedCycles.map((cycle) => (
        <CycleCard 
          key={cycle.id} 
          cycle={cycle} 
          onViewDetails={onViewDetails} 
        />
      ))}
    </div>
  );
};

export default CyclesList;
