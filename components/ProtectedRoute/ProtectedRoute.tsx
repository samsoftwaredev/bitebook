import { JSX, ReactElement, useEffect } from 'react';

import Loading from '@/components/Loading';
import { NAV_MAIN_LINKS } from '@/constants/nav';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

interface Props {
  children: JSX.Element | ReactElement<any, any>;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isLoading } = useAuthRedirect({
    redirectTo: NAV_MAIN_LINKS.login.link,
    redirectWhen: 'unauthenticated', // Redirect unauthenticated users to login
  });

  if (isLoading) return <Loading />;

  return children;
};

export default ProtectedRoute;
