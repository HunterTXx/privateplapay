import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Recycle } from 'lucide-react';

interface CycleProps {
  cycle: {
    id: string;
    investment_id: string;
    cycle_number: number;
    start_date: string;
    end_date: string;
    amount: number;
    profit: number;
    status: string;
    materials_recycled: number;
  };
}

const CO2_EMISSIONS_FACTOR = 2.5; // kg CO2 saved per kg plastic recycled
const PLASTIC_PER_DOLLAR = 1; // kg plastic recycled per $1 invested (mid-range estimate)

const CycleDetails: React.FC<CycleProps> = ({ cycle }) => {
  // Calculate recycled plastic based on investment amount
  const recycledPlastic = cycle.amount * PLASTIC_PER_DOLLAR;

  // Calculate CO2 emissions reduction
  const co2Reduction = recycledPlastic * CO2_EMISSIONS_FACTOR;

  // Calculate progress based on cycle status and timeline for each recycling stage
  const calculateStepProgress = () => {
    if (cycle.status === 'completed') {
      return [
        { name: 'Collection', completion: 100 },
        { name: 'Sorting', completion: 100 },
        { name: 'Shredding', completion: 100 },
        { name: 'Washing', completion: 100 },
        { name: 'Granulation', completion: 100 },
      ];
    }

    if (cycle.status === 'upcoming') {
      return [
        { name: 'Collection', completion: 0 },
        { name: 'Sorting', completion: 0 },
        { name: 'Shredding', completion: 0 },
        { name: 'Washing', completion: 0 },
        { name: 'Granulation', completion: 0 },
      ];
    }

    const startDate = new Date(cycle.start_date);
    const endDate = new Date(cycle.end_date);
    const now = new Date();
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    const overallProgress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));

    const timeDistribution = {
      collection: 25,
      sorting: 20,
      shredding: 30,
      washing: 15,
      granulation: 10,
    };

    const thresholds = {
      collection: timeDistribution.collection,
      sorting: timeDistribution.collection + timeDistribution.sorting,
      shredding: timeDistribution.collection + timeDistribution.sorting + timeDistribution.shredding,
      washing: timeDistribution.collection + timeDistribution.sorting + timeDistribution.shredding + timeDistribution.washing,
      granulation: 100,
    };

    return [
      {
        name: 'Collection',
        completion: overallProgress <= thresholds.collection
          ? (overallProgress / thresholds.collection) * 100
          : 100,
      },
      {
        name: 'Sorting',
        completion: overallProgress <= thresholds.collection
          ? 0
          : overallProgress <= thresholds.sorting
            ? ((overallProgress - thresholds.collection) / timeDistribution.sorting) * 100
            : 100,
      },
      {
        name: 'Shredding',
        completion: overallProgress <= thresholds.sorting
          ? 0
          : overallProgress <= thresholds.shredding
            ? ((overallProgress - thresholds.sorting) / timeDistribution.shredding) * 100
            : 100,
      },
      {
        name: 'Washing',
        completion: overallProgress <= thresholds.shredding
          ? 0
          : overallProgress <= thresholds.washing
            ? ((overallProgress - thresholds.shredding) / timeDistribution.washing) * 100
            : 100,
      },
      {
        name: 'Granulation',
        completion: overallProgress <= thresholds.washing
          ? 0
          : overallProgress <= thresholds.granulation
            ? ((overallProgress - thresholds.washing) / timeDistribution.granulation) * 100
            : 100,
      },
    ];
  };

  const cycleSteps = calculateStepProgress();

  // Calculate days remaining in the cycle
  const calculateDaysRemaining = () => {
    const endDate = new Date(cycle.end_date);
    const today = new Date();

    if (cycle.status === 'completed') {
      return 0;
    }

    const diffTime = Math.max(0, endDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();

  return (
    <div className="space-y-6 py-4">
      {/* Cycle summary */}
      <div className="bg-slate-50 p-4 rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Cycle Number</p>
            <p className="text-xl font-bold">#{cycle.cycle_number}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Status</p>
            <p
              className={`text-lg font-medium ${
                cycle.status === 'active'
                  ? 'text-green-600'
                  : cycle.status === 'completed'
                  ? 'text-blue-600'
                  : 'text-yellow-600'
              }`}
            >
              {cycle.status.charAt(0).toUpperCase() + cycle.status.slice(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Progress and timeframe */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Cycle Progress</h3>
          <span className="text-sm font-medium">{Math.floor(cycleSteps.reduce((acc, step) => acc + step.completion, 0) / cycleSteps.length)}%</span>
        </div>
        <Progress value={Math.floor(cycleSteps.reduce((acc, step) => acc + step.completion, 0) / cycleSteps.length)} className="h-2" />
        <div className="flex justify-between text-xs text-slate-500">
          <span>{new Date(cycle.start_date).toLocaleDateString()}</span>
          <span>{new Date(cycle.end_date).toLocaleDateString()}</span>
        </div>

      {/* Environmental Impact */}
      <div className="bg-green-50 border border-green-100 p-3 rounded-md">
        <div className="flex items-start">
          <Recycle className="w-4 h-4 text-green-600 mt-1 mr-2" />
          <div>
            <h4 className="text-sm font-medium text-green-800">Environmental Impact</h4>
            <p className="text-xs text-green-700 mt-1">
              This cycle will recycle approximately {recycledPlastic.toFixed(0)} kg of plastic waste,
              reducing CO₂ emissions by {co2Reduction.toFixed(1)} kg.
            </p>
          </div>
        </div>
      </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm text-slate-500">Days Remaining</p>
            <p className="text-lg font-medium">
              {cycle.status === 'upcoming'
                ? '(Not started)'
                : cycle.status === 'completed'
                ? 'Completed'
                : `${daysRemaining} days`}
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm text-slate-500">Expected Profit</p>
            <p className="text-lg font-medium text-investment-green">${cycle.profit.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Financial details */}
      <div className="space-y-4">
        <h3 className="font-medium">Financial Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm text-slate-500">Principal Amount</p>
            <p className="text-lg font-medium">${cycle.amount.toFixed(2)}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm text-slate-500">Expected Profit</p>
            <p className="text-lg font-medium text-investment-green">${cycle.profit.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-slate-50 p-3 rounded-md">
          <p className="text-sm text-slate-500">Total Value After Cycle</p>
          <p className="text-xl font-bold text-investment-green">
            ${(cycle.amount + cycle.profit).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CycleDetails;
