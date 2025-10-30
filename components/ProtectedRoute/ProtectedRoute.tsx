import { useRouter } from 'next/router';
import { JSX, ReactElement, useEffect } from 'react';

import { NAV_MAIN_LINKS } from '@/constants/nav';
import { useUserContext } from '@/context/UserContext';

interface Props {
  children: JSX.Element | ReactElement<any, any>;
}

const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();
  const { session } = useUserContext();
  useEffect(() => {
    // if user is not auth, redirect user to login screen
    if (!session) router.push(NAV_MAIN_LINKS.login.link);
  }, []);

  if (!session) return null;

  return children;
};

export default ProtectedRoute;
