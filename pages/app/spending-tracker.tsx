import type { NextPage } from 'next';

import { AppWrapper } from '@/components';
import { SpendingTrackerSection } from '@/components/Sections';
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
