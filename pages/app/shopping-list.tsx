'use client';

import type { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import AppWrapper from '@/components/AppWrapper';
import ShoppingListSection from '@/components/Sections/ShoppingListSection';
import { AppLayout } from '@/components/Templates';
import { ShoppingItem, ShoppingStats } from '@/interfaces/index';
import { getShoppingListByUserIdService } from '@/services/index';

const ShoppingList: NextPage = () => {
  const searchParams = useSearchParams();
  const [toBuyItems, setToBuyItems] = useState<ShoppingItem[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<ShoppingItem[]>([]);
  const [stats, setStats] = useState<ShoppingStats>({
    total: 0,
    purchased: 0,
    remaining: 0,
    status: 'active',
  });
  const shoppingListId = searchParams.get('shoppingListId');

  const getShoppingListData = async () => {
    if (!shoppingListId) return;
    try {
      const shoppingList = await getShoppingListByUserIdService({
        id: shoppingListId,
      });
      setStats({
        total: shoppingList.data?.stats.total || 0,
        purchased: shoppingList.data?.stats.purchased || 0,
        remaining: shoppingList.data?.stats.remaining || 0,
        status: shoppingList.data?.stats.status || 'active',
      });
      const toPurchaseItems = shoppingList.data?.toBuy.map((item) => ({
        ...item,
        purchased: false,
      }));
      const purchasedItems = shoppingList.data?.purchased.map((item) => ({
        ...item,
        purchased: true,
      }));
      setToBuyItems(toPurchaseItems || []);
      setPurchasedItems(purchasedItems || []);
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
      <ShoppingListSection
        toBuyItems={toBuyItems}
        purchasedItems={purchasedItems}
        stats={stats}
        setToBuyItems={setToBuyItems}
        setPurchasedItems={setPurchasedItems}
        setStats={setStats}
      />
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
