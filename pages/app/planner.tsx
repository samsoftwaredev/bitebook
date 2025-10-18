import type { NextPage } from 'next';

import AppWrapper from '@/components/AppWrapper';
import MealPlannerSection from '@/components/Sections/MealPlannerSection/MealPlannerSection';
import { AppLayout } from '@/components/Templates';

const Planner: NextPage = () => {
  return (
    <AppLayout>
      <MealPlannerSection />
    </AppLayout>
  );
};

const PlannerPageWrapper = () => {
  return (
    <AppWrapper>
      <Planner />
    </AppWrapper>
  );
};

export default PlannerPageWrapper;
