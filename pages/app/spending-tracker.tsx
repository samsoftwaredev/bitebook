import type { NextPage } from 'next';

import AppWrapper from '@/components/AppWrapper';
import { AppLayout } from '@/components/Templates';

const SpendingTracker: NextPage = () => {
  return <AppLayout>SpendingTracker</AppLayout>;
};

const SpendingTrackerPageWrapper = () => {
  return (
    <AppWrapper>
      <SpendingTracker />
    </AppWrapper>
  );
};

export default SpendingTrackerPageWrapper;
