
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, Star, CirclePercent, BadgeCheck } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
  xpReward: number;
  icon: 'trophy' | 'award' | 'star' | 'badge';
}

interface LevelProgressProps {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  achievements: Achievement[];
}

const LevelProgress: React.FC<LevelProgressProps> = ({
  level,
  currentXP,
  nextLevelXP,
  achievements
}) => {
  // Calculate percentage to next level
  const progressToNextLevel = Math.min(100, Math.round((currentXP / nextLevelXP) * 100));
  
  // Render achievement icon based on type
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'trophy':
        return <Trophy className="h-5 w-5 text-amber-500" />;
      case 'award':
        return <Award className="h-5 w-5 text-blue-500" />;
      case 'star':
        return <Star className="h-5 w-5 text-purple-500" />;
      case 'badge':
      default:
        return <BadgeCheck className="h-5 w-5 text-green-600" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Investor Level {level}
          </CardTitle>
          <Badge className="bg-amber-500 hover:bg-amber-600">
            {level}
          </Badge>
        </div>
        <CardDescription>
          Complete achievements to earn XP and level up your investor status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Level progress */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium flex items-center gap-1.5">
              <CirclePercent className="h-4 w-4 text-amber-600" />
              Progress to Level {level + 1}
            </span>
            <span className="text-sm text-amber-700 font-medium">{progressToNextLevel}%</span>
          </div>
          <Progress value={progressToNextLevel} className="h-2" />
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>{currentXP} XP</span>
            <span>{nextLevelXP} XP</span>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Achievements</h4>
          
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-3 rounded-md border ${
                achievement.completed ? 'bg-green-50 border-green-100' : 'bg-slate-50 border-slate-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  achievement.completed ? 'bg-green-100' : 'bg-slate-200'
                }`}>
                  {renderIcon(achievement.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">{achievement.title}</h5>
                    <span className="text-xs font-medium text-green-600">+{achievement.xpReward} XP</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{achievement.description}</p>
                  
                  {!achievement.completed && achievement.progress > 0 && (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                        <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                      </div>
                      <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelProgress;
