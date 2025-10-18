import type { NextPage } from 'next';

import AppWrapper from '@/components/AppWrapper';
import { AppLayout } from '@/components/Templates';

const ShoppingList: NextPage = () => {
  return <AppLayout>ShoppingList</AppLayout>;
};

const ShoppingListPageWrapper = () => {
  return (
    <AppWrapper>
      <ShoppingList />
    </AppWrapper>
  );
};

export default ShoppingListPageWrapper;
