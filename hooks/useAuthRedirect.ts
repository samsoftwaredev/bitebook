import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { NAV_APP_LINKS } from '@/constants/nav';
import { useUserContext } from '@/context/UserContext';

interface UseAuthRedirectOptions {
  redirectTo?: string;
  redirectWhen?: 'authenticated' | 'unauthenticated';
  replace?: boolean;
}

/**
 * Custom hook to handle authentication-based redirects
 * @param options Configuration for redirect behavior
 * @returns Object with loading state and redirect status
 */
export const useAuthRedirect = (options: UseAuthRedirectOptions = {}) => {
  const {
    redirectTo = NAV_APP_LINKS.app.link,
    redirectWhen = 'authenticated',
    replace = false,
  } = options;

  const { isLoading, isAuth } = useUserContext();
  const router = useRouter();

  const shouldRenderContent = () => {
    const shouldRedirect =
      (redirectWhen === 'authenticated' && isAuth) ||
      (redirectWhen === 'unauthenticated' && !isAuth);

    if (shouldRedirect) {
      if (replace) {
        router.replace(redirectTo);
      } else {
        router.push(redirectTo);
      }
    }
  };

  useEffect(() => {
    if (isLoading) return; // Don't redirect while loading
    shouldRenderContent();
  }, [isAuth, isLoading, redirectTo, redirectWhen, replace, router]);

  return {
    isLoading,
    isAuth,
    shouldRenderContent,
  };
};
