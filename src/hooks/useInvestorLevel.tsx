import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

interface LevelData {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  progress: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
  xpReward: number;
  icon: 'trophy' | 'award' | 'star' | 'badge';
  dateCompleted?: string; // Add completion date
}

// Threshold for each level (XP needed)
const LEVEL_THRESHOLDS = [
  0,      // Level 1 (starts at 0 XP)
  100,    // Level 2 (need 100 XP)
  250,    // Level 3
  500,    // Level 4
  1000,   // Level 5
  2000,   // Level 6
  3500,   // Level 7
  5000,   // Level 8
  7500,   // Level 9
  10000   // Level 10
];

export const useInvestorLevel = (): [LevelData | null, boolean, Error | null] => {
  const { user } = useAuth();
  const [levelData, setLevelData] = useState<LevelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setLevelData(null);
      setLoading(false);
      return;
    }

    const fetchLevelData = async () => {
      try {
        // Fetch all required data in parallel
        const [
          { data: investments, error: investmentsError },
          { data: transactions, error: transactionsError },
          { data: userAchievements, error: achievementsError }
        ] = await Promise.all([
          supabase
            .from('investments')
            .select('*')
            .eq('user_id', user.id),
          supabase
            .from('transactions')
            .select('*')
            .eq('user_id', user.id),
          supabase
            .from('user_achievements')
            .select('*')
            .eq('user_id', user.id)
        ]);

        if (investmentsError) throw investmentsError;
        if (transactionsError) throw transactionsError;
        if (achievementsError) throw achievementsError;

        // Calculate investment metrics
        const totalInvestmentAmount = investments?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0;
        const totalCompletedCycles = investments?.reduce((sum, inv) => 
          sum + (inv.status === 'completed' ? inv.cycles : 0), 0) || 0;
        const totalTransactions = transactions?.length || 0;

        // Define achievements and check if they're already completed
        const achievements: Achievement[] = [
          {
            id: 'first-investment',
            title: 'First Investment',
            description: 'Make your first investment',
            progress: investments && investments.length > 0 ? 1 : 0,
            maxProgress: 1,
            completed: false, // Will be updated based on userAchievements
            xpReward: 50,
            icon: 'trophy'
          },
          {
            id: 'investment-1000',
            title: 'Serious Investor',
            description: 'Invest a total of $1,000',
            progress: Math.min(totalInvestmentAmount, 1000),
            maxProgress: 1000,
            completed: false,
            xpReward: 100,
            icon: 'award'
          },
          {
            id: 'investment-5000',
            title: 'Professional Investor',
            description: 'Invest a total of $5,000',
            progress: Math.min(totalInvestmentAmount, 5000),
            maxProgress: 5000,
            completed: false,
            xpReward: 250,
            icon: 'star'
          },
          {
            id: 'complete-cycle',
            title: 'First Complete Cycle',
            description: 'Complete your first investment cycle',
            progress: totalCompletedCycles,
            maxProgress: 1,
            completed: false,
            xpReward: 75,
            icon: 'badge'
          },
          {
            id: 'transactions-5',
            title: 'Active Participant',
            description: 'Complete 5 transactions',
            progress: Math.min(totalTransactions, 5),
            maxProgress: 5,
            completed: false,
            xpReward: 50,
            icon: 'award'
          }
        ];

        // Mark achievements as completed based on user_achievements table
        const completedAchievements = new Set(userAchievements?.map(ua => ua.achievement_id) || []);
        
        // Calculate base XP
        const investmentXP = Math.floor(totalInvestmentAmount / 10); // 1 XP per $10 invested
        const cyclesXP = totalCompletedCycles * 20; // 20 XP per completed cycle
        const transactionsXP = totalTransactions * 5; // 5 XP per transaction

        // Calculate achievement XP only from already completed achievements
        const achievementXP = (userAchievements || []).reduce((sum, ua) => sum + ua.xp_awarded, 0);

        // Process new achievements
        for (const achievement of achievements) {
          const isCompleted = completedAchievements.has(achievement.id);
          const shouldComplete = (
            (achievement.id === 'first-investment' && investments && investments.length > 0) ||
            (achievement.id === 'investment-1000' && totalInvestmentAmount >= 1000) ||
            (achievement.id === 'investment-5000' && totalInvestmentAmount >= 5000) ||
            (achievement.id === 'complete-cycle' && totalCompletedCycles >= 1) ||
            (achievement.id === 'transactions-5' && totalTransactions >= 5)
          );

          // If achievement should be completed and isn't already recorded
          if (shouldComplete && !isCompleted) {
            try {
              const { error: insertError } = await supabase
                .from('user_achievements')
                .insert({
                  user_id: user.id,
                  user_login: 'HunterTXx',
                  achievement_id: achievement.id,
                  completed_at: '2025-05-07 14:12:58', // Using the provided UTC time
                  xp_awarded: achievement.xpReward,
                  created_at: '2025-05-07 14:12:58'
                });

              if (insertError) {
                console.error(`Error awarding achievement ${achievement.id}:`, insertError);
              } else {
                completedAchievements.add(achievement.id);
                // Show achievement notification
                toast({
                  title: "Achievement Unlocked!",
                  description: `${achievement.title} - ${achievement.description}`,
                });
              }
            } catch (err) {
              console.error(`Error processing achievement ${achievement.id}:`, err);
            }
          }

          // Update achievement completion status
          achievement.completed = completedAchievements.has(achievement.id);
          if (achievement.completed) {
            const completedAchievement = userAchievements?.find(ua => ua.achievement_id === achievement.id);
            achievement.dateCompleted = completedAchievement?.completed_at;
          }
        }

        // Calculate total XP including only recorded achievements
        const totalXP = investmentXP + cyclesXP + transactionsXP + achievementXP;

        // Determine current level
        let currentLevel = 1;
        for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
          if (totalXP >= LEVEL_THRESHOLDS[i]) {
            currentLevel = i + 1;
          } else {
            break;
          }
        }

        // Calculate level progress
        const nextLevelIndex = Math.min(currentLevel, LEVEL_THRESHOLDS.length - 1);
        const nextLevelXP = LEVEL_THRESHOLDS[nextLevelIndex];
        const currentLevelXP = currentLevel > 1 ? LEVEL_THRESHOLDS[nextLevelIndex - 1] : 0;
        const xpProgress = totalXP - currentLevelXP;
        const xpNeeded = nextLevelXP - currentLevelXP;

        // Update level data state
        setLevelData({
          level: currentLevel,
          currentXP: totalXP,
          nextLevelXP: xpNeeded,
          progress: xpProgress,
          achievements
        });

      } catch (err) {
        console.error("Error fetching investor level data:", err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchLevelData();
  }, [user]);

  return [levelData, loading, error];
};
