import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NAV_APP_LINKS, NAV_MAIN_LINKS } from '@/constants/nav';
import { LanguageContextProvider } from '@/context/LanguageContext';
import { UserContextProvider } from '@/context/UserContext';
import { theme } from '@/styles/mui-overwrite';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  const authPaths =
    pathname.includes(NAV_APP_LINKS.app.link) ||
    pathname.includes(NAV_MAIN_LINKS.login.link) ||
    pathname.includes(NAV_MAIN_LINKS.signup.link) ||
    pathname.includes(NAV_MAIN_LINKS.register.link) ||
    pathname.includes(NAV_MAIN_LINKS.forgotPassword.link);

  if (authPaths) {
    return (
      <UserContextProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <LanguageContextProvider>
              <ToastContainer autoClose={5000} />
              <Component {...pageProps} />
            </LanguageContextProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </UserContextProvider>
    );
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageContextProvider>
          <Component {...pageProps} />
        </LanguageContextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MyApp;
