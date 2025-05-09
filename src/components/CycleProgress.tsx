import { Progress } from '@/components/ui/progress';

interface CycleStep {
  name: string;
  completion: number;
}

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
  materials_recycled: number;
}

interface CycleProgressProps {
  cycle: Cycle;
}

const CycleProgress: React.FC<CycleProgressProps> = ({ cycle }) => {
  // Calculate progress based on cycle status and materials_recycled
  const calculateStepProgress = () => {
    // If cycle is completed, all steps are at 100%
    if (cycle.status === 'completed') {
      return [
        { name: 'Collection', completion: 100 },
        { name: 'Sorting', completion: 100 },
        { name: 'Shredding', completion: 100 },
        { name: 'Washing', completion: 100 },
        { name: 'Granulation', completion: 100 },
      ];
    }
    
    // If cycle is upcoming, all steps are at 0%
    if (cycle.status === 'upcoming') {
      return [
        { name: 'Collection', completion: 0 },
        { name: 'Sorting', completion: 0 },
        { name: 'Shredding', completion: 0 },
        { name: 'Washing', completion: 0 },
        { name: 'Granulation', completion: 0 },
      ];
    }
    
    // For active cycles, calculate progress based on where we are in the cycle timeline
    const startDate = new Date(cycle.start_date);
    const endDate = new Date(cycle.end_date);
    const now = new Date();
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    const overallProgress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
    
    // Define the time distribution for each stage as percentage of the total cycle time
    // These values represent how much of the total cycle time each stage takes
    const timeDistribution = {
      collection: 25, // Collection takes 25% of the total cycle time
      sorting: 20,    // Sorting takes 20% of the total cycle time
      shredding: 30,  // Shredding takes 30% of the total cycle time
      washing: 15,    // Washing takes 15% of the total cycle time
      granulation: 10 // Granulation takes 10% of the total cycle time
    };
    
    // Calculate the progress thresholds for each stage
    const thresholds = {
      collection: timeDistribution.collection,
      sorting: timeDistribution.collection + timeDistribution.sorting,
      shredding: timeDistribution.collection + timeDistribution.sorting + timeDistribution.shredding,
      washing: timeDistribution.collection + timeDistribution.sorting + timeDistribution.shredding + timeDistribution.washing,
      granulation: 100 // Complete cycle
    };
    
    // Calculate the completion percentage for each stage based on the overall progress
    return [
      {
        name: 'Collection',
        completion: overallProgress <= thresholds.collection
          ? (overallProgress / thresholds.collection) * 100
          : 100
      },
      {
        name: 'Sorting',
        completion: overallProgress <= thresholds.collection
          ? 0
          : overallProgress <= thresholds.sorting
            ? ((overallProgress - thresholds.collection) / timeDistribution.sorting) * 100
            : 100
      },
      {
        name: 'Shredding',
        completion: overallProgress <= thresholds.sorting
          ? 0
          : overallProgress <= thresholds.shredding
            ? ((overallProgress - thresholds.sorting) / timeDistribution.shredding) * 100
            : 100
      },
      {
        name: 'Washing',
        completion: overallProgress <= thresholds.shredding
          ? 0
          : overallProgress <= thresholds.washing
            ? ((overallProgress - thresholds.shredding) / timeDistribution.washing) * 100
            : 100
      },
      {
        name: 'Granulation',
        completion: overallProgress <= thresholds.washing
          ? 0
          : overallProgress <= thresholds.granulation
            ? ((overallProgress - thresholds.washing) / timeDistribution.granulation) * 100
            : 100
      }
    ];
  };

  const cycleSteps = calculateStepProgress();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-5">
      <h2 className="text-lg font-semibold mb-6">Current Cycle Progress</h2>
      
      {cycleSteps.map((step) => (
        <div key={step.name} className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm">{step.name}</span>
            <span className="text-sm font-medium">{Math.round(step.completion)}%</span>
          </div>
          <Progress value={step.completion} className="h-2" />
        </div>
      ))}
    </div>
  );
};

export default CycleProgress;
