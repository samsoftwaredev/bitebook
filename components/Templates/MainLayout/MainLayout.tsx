import React from 'react';

import { Footer, HomeNavbar } from '@/components';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <div style={{ flex: '1 0 auto' }}>
        <HomeNavbar />
        {children}
      </div>
      <div style={{ flexShrink: 0 }}>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
