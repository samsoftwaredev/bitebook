import type { NextPage } from 'next';
import { useEffect } from 'react';

import AppWrapper from '@/components/AppWrapper';
import ShoppingListSection from '@/components/Sections/ShoppingListSection';
import { AppLayout } from '@/components/Templates';
import { useUserContext } from '@/context/UserContext';
import { getShoppingListByUserIdService } from '@/services/index';

const ShoppingList: NextPage = () => {
  const { user } = useUserContext();
  const getShoppingListData = async () => {
    if (!user) return;

    try {
      const shoppingList = await getShoppingListByUserIdService(user.userId);
      console.log('Shopping List:', shoppingList);
    } catch (error) {
      console.error('Error fetching shopping list:', error);
    }
  };

  useEffect(() => {
    getShoppingListData();
  }, []);
  return (
    <AppLayout>
      <ShoppingListSection />
    </AppLayout>
  );
};

const ShoppingListPageWrapper = () => {
  return (
    <AppWrapper>
      <ShoppingList />
    </AppWrapper>
  );
};

export default ShoppingListPageWrapper;
