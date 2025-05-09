import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CirclePercent, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface UserLevelProps {
  level: number;
  progress: number;
  nextLevelThreshold: number;
}

const UserLevel: React.FC<UserLevelProps> = ({ level, progress, nextLevelThreshold }) => {
  // Defensive checks to prevent NaN and negative values
  const safeProgress = typeof progress === 'number' && isFinite(progress) && progress >= 0 ? progress : 0;
  const safeThreshold = typeof nextLevelThreshold === 'number' && isFinite(nextLevelThreshold) && nextLevelThreshold > 0 ? nextLevelThreshold : 1;
  const progressPercent = Math.min(100, Math.max(0, Math.round((safeProgress / safeThreshold) * 100)));
  const xpNeeded = Math.max(0, safeThreshold - safeProgress);

  return (
    <div className="bg-slate-50 rounded-md p-3 border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Trophy className="h-4 w-4 text-amber-500" />
          <span className="font-medium text-sm">Investor Level</span>
        </div>
        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100">
          Level {level}
        </Badge>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Progress to Level {level + 1}</span>
          <span className="font-medium">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-1.5" />
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">{safeProgress} XP</span>
          <span className="flex items-center gap-1 text-amber-600">
            <CirclePercent className="h-3 w-3" />
            <span>{xpNeeded} XP needed</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserLevel;
