import { Box, Container, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { Loading, MainLayout, Meta } from '@/components';
import { NAV_APP_LINKS, pageView } from '@/constants';
import { useLanguageContext } from '@/context/LanguageContext';
import { useUserContext } from '@/context/UserContext';

const ForgotPassword: NextPage = () => {
  const { lang } = useLanguageContext() as { lang: keyof typeof pageView };
  const { isLoading, session } = useUserContext();
  const router = useRouter();
  const pageLanguage = useMemo(() => pageView[lang], [lang]);

  useEffect(() => {
    // if user is auth, navigate user to application
    if (session) router.push(NAV_APP_LINKS.app.link);
  }, [session]);

  if (isLoading) return <Loading />;

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
