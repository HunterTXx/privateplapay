import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import ProfileForm from '@/components/profile/ProfileForm';
import PasswordForm from '@/components/profile/PasswordForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader, Trophy } from 'lucide-react';
import LevelProgress from '@/components/achievements/LevelProgress';
import { useInvestorLevel } from '@/hooks/useInvestorLevel';
import UserLevel from '@/components/UserLevel';

interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  withdraw_balance: number;
  deposit_balance: number;
  wallet_address?: string | null;
}

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [levelData, levelLoading, levelError] = useInvestorLevel();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfile(data);
      } catch (error: any) {
        setError(error.message);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load profile data',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader className="h-8 w-8 animate-spin text-investment-green mb-4" />
            <p className="text-sm text-muted-foreground">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-red-600 text-lg font-medium mb-2">Something went wrong</h2>
            <p className="text-red-500">We couldn't load your profile data. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-6">
          <h1 className="text-2xl font-bold text-center md:text-left w-full">Account Settings</h1>
          {levelData && !levelLoading && (
            <div className="mt-2 md:mt-0 w-full md:w-auto flex justify-center md:justify-end">
              <UserLevel 
                level={levelData.level} 
                progress={levelData.currentXP} 
                nextLevelThreshold={levelData.nextLevelXP} 
              />
            </div>
          )}
        </div>
        <Tabs defaultValue="profile" className="w-full max-w-3xl mx-auto">
          <TabsList className="w-full flex flex-wrap gap-2 mb-4">
            <TabsTrigger value="profile" className="flex-1 min-w-[120px]">Profile Information</TabsTrigger>
            <TabsTrigger value="security" className="flex-1 min-w-[120px]">Security</TabsTrigger>
            <TabsTrigger value="achievements" className="flex-1 min-w-[120px] flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            {profile && <ProfileForm profile={profile} setProfile={setProfile} />}
          </TabsContent>
          
          <TabsContent value="security">
            <PasswordForm />
          </TabsContent>
          
          <TabsContent value="achievements">
            {levelLoading ? (
              <div className="flex justify-center py-12">
                <Loader className="h-6 w-6 animate-spin text-amber-500" />
              </div>
            ) : levelData ? (
              <LevelProgress
                level={levelData.level}
                currentXP={levelData.currentXP}
                nextLevelXP={levelData.nextLevelXP}
                achievements={levelData.achievements}
              />
            ) : (
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-8 text-center">
                <Trophy className="h-12 w-12 text-amber-400 mx-auto mb-4 opacity-40" />
                <h3 className="text-lg font-medium mb-1">No achievements yet</h3>
                <p className="text-slate-500">Make your first investment to start earning XP and unlocking achievements</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
