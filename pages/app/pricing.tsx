import type { NextPage } from 'next';

import AppWrapper from '@/components/AppWrapper';
import PricingSection from '@/components/Sections/PricingSection';
import { AppLayout } from '@/components/Templates';

const Pricing: NextPage = () => {
  return (
    <AppLayout>
      <PricingSection />
    </AppLayout>
  );
};

const PricingPageWrapper = () => {
  return (
    <AppWrapper>
      <Pricing />
    </AppWrapper>
  );
};

export default PricingPageWrapper;
