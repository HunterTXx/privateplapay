
import { supabase } from '@/integrations/supabase/client';

// This function will promote the current user to admin if they are the first user
export const setupFirstUserAsAdmin = async (userId: string): Promise<boolean> => {
  try {
    // Check if any admin users exist
    const { data: existingAdmins, error: checkError } = await supabase
      .from('admin_users')
      .select('id')
      .limit(1);
      
    if (checkError) {
      console.error("Error checking admin users:", checkError);
      return false;
    }
    
    // If no admins exist, make current user an admin
    if (!existingAdmins || existingAdmins.length === 0) {
      console.log("No admins found, promoting current user to admin");
      
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({ user_id: userId, role: 'admin' });
        
      if (insertError) {
        console.error("Error promoting user to admin:", insertError);
        return false;
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error in setupFirstUserAsAdmin:", error);
    return false;
  }
};
