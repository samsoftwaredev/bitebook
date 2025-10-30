import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import {
  Dispatch,
  JSX,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { supabase } from '@/classes';
import { Loading } from '@/components';
import { NAV_MAIN_LINKS } from '@/constants/nav';
import { User } from '@/interfaces';

interface UserContext {
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
  getProfile: (session: Session | null) => Promise<User | undefined>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  isLoading: boolean;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UserContext = createContext<UserContext | undefined>(undefined);

const UserContextProvider = ({ children }: Props) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
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
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw Error('No user found');
      const userData = {
        userId: user.id,
        email: user.email,
        fullName: user.user_metadata.display_name,
        firstName: user.user_metadata.display_name.split(' ')[0],
        lastName: user.user_metadata.display_name.split(' ')[1] || '',
        genderMale: user.user_metadata.gender === 'male',
        emailVerified: user.user_metadata.email_verified,
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

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('No session');
      }

      setSession(session);
      await getProfile(session);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      getProfile,
      logout: onLogout,
      session,
      setSession,
      checkAuth,
      isLoading,
    }),
    [user, setUser, session, setSession, isLoading],
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
