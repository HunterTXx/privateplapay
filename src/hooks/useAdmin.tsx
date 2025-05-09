
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { checkIsAdmin } from '@/utils/adminUtils';

export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAdmin = async () => {
      setLoading(true);
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const adminStatus = await checkIsAdmin(user.id);
      setIsAdmin(adminStatus);
      setLoading(false);
    };

    checkAdmin();
  }, [user]);

  return { isAdmin, loading };
};
