import { Box, Container, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { Loading, MainLayout, Meta } from '@/components';
import { NAV_APP_LINKS } from '@/constants/nav';
import { pageView } from '@/constants/register';
import { useLanguageContext } from '@/context/LanguageContext';
import { useUserContext } from '@/context/UserContext';

const Login: NextPage = () => {
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
      <Meta pageTitle="Log In" />
      <Container maxWidth="xs">
        <Typography mt={3} variant="h4" component="h1">
          {pageLanguage.logIn.title}
        </Typography>
        <Typography component="p">{pageLanguage.logIn.header}</Typography>
        <Box my={2}>{pageLanguage.logIn?.component}</Box>
        <Typography textAlign="center" component="p">
          {pageLanguage.logIn.footer}
        </Typography>
      </Container>
    </MainLayout>
  );
};

export default Login;
