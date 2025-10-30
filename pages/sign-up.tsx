import { Box, Container, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { Loading, MainLayout, Meta } from '@/components';
import { NAV_APP_LINKS } from '@/constants/nav';
import { pageView } from '@/constants/register';
import { useLanguageContext } from '@/context/LanguageContext';
import { useUserContext } from '@/context/UserContext';

const Register: NextPage = () => {
  const router = useRouter();
  const { lang } = useLanguageContext() as { lang: keyof typeof pageView };
  const { session, isLoading } = useUserContext();
  const pageLanguage = useMemo(() => pageView[lang], [lang]);

  useEffect(() => {
    // if user is auth, navigate user to application
    if (session) router.push(NAV_APP_LINKS.app.link);
  }, [session]);

  if (isLoading) return <Loading />;

  return (
    <MainLayout>
      <Meta pageTitle="Sign Up" />
      <Container maxWidth="xs">
        <Typography mt={3} variant="h4" component="h1">
          {pageLanguage.signUp.title}
        </Typography>
        <Typography component="p">{pageLanguage.signUp.header}</Typography>
        <Box my={2}>{pageLanguage.signUp?.component}</Box>
        <Typography textAlign="center" component="p">
          {pageLanguage.signUp.footer}
        </Typography>
      </Container>
    </MainLayout>
  );
};

export default Register;
