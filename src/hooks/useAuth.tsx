import { Session, User } from '@supabase/supabase-js';
import { supabase, isLocalStorageAvailable } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { checkIsAdmin } from '@/utils/adminUtils';
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const prevUserRef = useRef<User | null>(null);

  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);

        // Only show toast if previous user was null (i.e., this is a real login)
        if (event === 'SIGNED_IN' && currentSession?.user && !prevUserRef.current) {
      toast({
        title: "Success!",
        description: "You are now signed in",
      });
          // GLOBAL REDIRECT LOGIC
          // Only redirect if on /auth or /
          const currentPath = location.pathname;
          if (currentPath === '/auth' || currentPath === '/') {
            checkIsAdmin(currentSession.user.id).then(isAdmin => {
              if (isAdmin) {
                navigate('/admin', { replace: true });
              } else {
                navigate('/dashboard', { replace: true });
              }
            });
          }
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out",
          });
        }
        // Update the ref for next time
        prevUserRef.current = currentSession?.user ?? null;
      }
    );

    // Get the initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
      
     
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate, location]);

  const signIn = async (email: string, password: string) => {
    if (!isLocalStorageAvailable()) {
      toast({
        title: "Error",
        description: "Local storage is required for login. Please enable it in your browser settings.",
        variant: "destructive",
      });
      return;
    }
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
      // No need to navigate here, handled globally in onAuthStateChange
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!isLocalStorageAvailable()) {
      toast({
        title: "Error",
        description: "Local storage is required for sign up. Please enable it in your browser settings.",
        variant: "destructive",
      });
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Insert into profiles table with email and full name
        if (data.user) {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            email,
            full_name: fullName,
          });
        }
        toast({
          title: "Account created",
          description: "Please check your email to verify your account",
        });
        navigate('/auth');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
