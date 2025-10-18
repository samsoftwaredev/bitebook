import type { NextPage } from 'next';

import AppWrapper from '@/components/AppWrapper';
import SpendingTrackerSection from '@/components/Sections/SpendingTrackerSection';
import { AppLayout } from '@/components/Templates';

const SpendingTracker: NextPage = () => {
  return (
    <AppLayout>
      <SpendingTrackerSection />
    </AppLayout>
  );
};

const SpendingTrackerPageWrapper = () => {
  return (
    <AppWrapper>
      <SpendingTracker />
    </AppWrapper>
  );
};

export default SpendingTrackerPageWrapper;
