import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { NAV_APP_LINKS, NAV_MAIN_LINKS } from '@/constants/nav';
import { LanguageContextProvider } from '@/context/LanguageContext';
import { UserContextProvider } from '@/context/UserContext';

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
      <ThemeRegistry>
        <CssBaseline />
        <UserContextProvider>
          <LanguageContextProvider>
            <ToastContainer autoClose={5000} />
            <Component {...pageProps} />
          </LanguageContextProvider>
        </UserContextProvider>
      </ThemeRegistry>
    );
  }

  return (
    <ThemeRegistry>
      <CssBaseline />
      <LanguageContextProvider>
        <Component {...pageProps} />
      </LanguageContextProvider>
    </ThemeRegistry>
  );
};

export default MyApp;
