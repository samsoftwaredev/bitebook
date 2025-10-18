import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { supabase } from '@/classes/SupabaseDB';
import { Loading } from '@/components';
import { NAV_MAIN_LINKS } from '@/constants';
import { User } from '@/interfaces';

interface UserContext {
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
  getProfile: (session: Session | null) => Promise<User | undefined>;
  logout: () => Promise<void>;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UserContext = createContext<UserContext | undefined>(undefined);

const UserContextProvider = ({ children }: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const onLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      router.push(NAV_MAIN_LINKS.home.link);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out');
    }
  };

  const getProfile = async (
    userSession: Session | null,
  ): Promise<User | undefined> => {
    setIsLoading(true);
    try {
      if (!userSession) throw Error('No session');
      const userData = {
        userId: '34234',
        email: 'user@example.com',
        fullName: '',
        firstName: '',
        lastName: '',
        genderMale: false,
        dateOfBirth: '',
        pictureUrl: '',
        isConfirmed: false,
        updateAt: '',
      };

      setUser(userData);
      return userData;
    } catch (error) {
      setUser(null);
      router.push(NAV_MAIN_LINKS.login.link);
    } finally {
      setIsLoading(false);
    }
  };

  const getSession = async () => {
    setIsLoading(true);
    try {
      const res = await supabase.auth.getSession();
      if (res.data.session) getProfile(res.data.session);
      else throw new Error('No session');
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      getProfile,
      logout: onLogout,
    }),
    [user, setUser],
  );

  if (isLoading) return <Loading />;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a ContextProvider');
  }
  return context;
};

export { UserContextProvider, useUserContext };
