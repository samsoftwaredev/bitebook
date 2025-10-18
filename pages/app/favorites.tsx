import type { NextPage } from 'next';

import AppWrapper from '@/components/AppWrapper';
import MyFavoritesSection from '@/components/Sections/MyFavoritesSection';
import { AppLayout } from '@/components/Templates';

const Favorite: NextPage = () => {
  return (
    <AppLayout>
      <MyFavoritesSection />
    </AppLayout>
  );
};

const FavoritePageWrapper = () => {
  return (
    <AppWrapper>
      <Favorite />
    </AppWrapper>
  );
};

export default FavoritePageWrapper;
