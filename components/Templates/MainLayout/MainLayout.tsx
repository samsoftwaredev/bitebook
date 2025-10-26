import React from 'react';

import { Footer, HomeNavbar } from '@/components';

interface Props {
  children: React.ReactNode;
  topNavbar?: React.ReactNode;
}

const MainLayout = ({ children, topNavbar = <HomeNavbar /> }: Props) => {
  return (
    <div>
      <div>
        {topNavbar}
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
