
import { supabase } from '@/integrations/supabase/client';

// Function to check if the current user is an admin
export const checkIsAdmin = async (userId: string | undefined): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    const { data, error } = await supabase
      .rpc('is_admin', { user_id: userId });
      
    if (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
    
    return data || false;
  } catch (error) {
    console.error("Exception checking admin status:", error);
    return false;
  }
};

// Function to add a user as admin
export const addAdmin = async (userId: string, role: string = 'admin'): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('admin_users')
      .insert({ user_id: userId, role });
      
    return !error;
  } catch (error) {
    console.error("Error adding admin:", error);
    return false;
  }
};

// Function to remove admin role from a user
export const removeAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('admin_users')
      .delete()
      .eq('user_id', userId);
      
    return !error;
  } catch (error) {
    console.error("Error removing admin:", error);
    return false;
  }
};
