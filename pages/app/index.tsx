import type { NextPage } from 'next';

import AppWrapper from '@/components/AppWrapper';
import { AppLayout } from '@/components/Templates';
import { useLanguageContext } from '@/context/LanguageContext';

const App: NextPage = () => {
  const { lang } = useLanguageContext();

  return <AppLayout>Welcome</AppLayout>;
};

const AppPageWrapper = () => {
  return (
    <AppWrapper>
      <App />
    </AppWrapper>
  );
};

export default AppPageWrapper;
