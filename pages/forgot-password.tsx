import { Box, Container, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useMemo } from 'react';

import { Loading, MainLayout, Meta } from '@/components';
import { pageView } from '@/constants/register';
import { useLanguageContext } from '@/context/LanguageContext';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const ForgotPassword: NextPage = () => {
  const { lang } = useLanguageContext() as { lang: keyof typeof pageView };
  const { isLoading, isAuth, shouldRenderContent } = useAuthRedirect({
    redirectWhen: 'authenticated', // Redirect authenticated users to app
  });
  const pageLanguage = useMemo(() => pageView[lang], [lang]);

  if (isLoading) return <Loading />;

  if (isAuth) {
    shouldRenderContent();
    return null;
  }

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
