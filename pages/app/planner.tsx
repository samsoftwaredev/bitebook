import type { NextPage } from 'next';

import AppWrapper from '@/components/AppWrapper';
import MealPlannerEditorSection from '@/components/Sections/MealPlannerEditorSection';
import MealPlannerSection from '@/components/Sections/MealPlannerSection';
import { AppLayout } from '@/components/Templates';

const Planner: NextPage = () => {
  const isEditMode = true; // You can replace this with actual logic to determine the mode
  return (
    <AppLayout>
      {isEditMode ? <MealPlannerEditorSection /> : <MealPlannerSection />}
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
