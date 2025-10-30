import { Box, Container, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { Loading, MainLayout, Meta } from '@/components';
import { NAV_APP_LINKS } from '@/constants/nav';
import { pageView } from '@/constants/register';
import { useLanguageContext } from '@/context/LanguageContext';
import { useUserContext } from '@/context/UserContext';

const ForgotPassword: NextPage = () => {
  const { lang } = useLanguageContext() as { lang: keyof typeof pageView };
  const { isLoading, isAuth } = useUserContext();
  const router = useRouter();
  const pageLanguage = useMemo(() => pageView[lang], [lang]);

  useEffect(() => {
    // if user is auth, navigate user to application
    if (isAuth) router.push(NAV_APP_LINKS.app.link);
  }, [isAuth]);

  if (isLoading) return <Loading />;

  if (isAuth) return null;

  return (
    <MainLayout>
      <Meta pageTitle="ForgotPassword" />
      <Container maxWidth="xs">
        <Typography mt={3} variant="h4" component="h1">
          {pageLanguage.forgotPassword.title}
        </Typography>
        <Typography variant="body1" component="p">
          {pageLanguage.forgotPassword.header}
        </Typography>
        <Box my={2}>{pageLanguage.forgotPassword?.component}</Box>
        <Typography textAlign="center" variant="body1" component="p">
          {pageLanguage.forgotPassword.footer}
        </Typography>
      </Container>
    </MainLayout>
  );
};

export default ForgotPassword;
