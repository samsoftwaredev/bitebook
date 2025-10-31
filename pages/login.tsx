import { Box, Container, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useMemo } from 'react';

import { Loading, MainLayout, Meta } from '@/components';
import { pageView } from '@/constants/register';
import { useLanguageContext } from '@/context/LanguageContext';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const Login: NextPage = () => {
  const { lang } = useLanguageContext() as { lang: keyof typeof pageView };
  const { isLoading, isAuth, shouldRenderContent } = useAuthRedirect({
    redirectWhen: 'authenticated',
  });

  const pageLanguage = useMemo(() => pageView[lang], [lang]);

  if (isLoading) return <Loading />;

  if (isAuth) {
    shouldRenderContent();
    return null;
  }

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
