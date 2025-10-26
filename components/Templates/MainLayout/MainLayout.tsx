import { ReactNode } from 'react';

import { Footer, HomeNavbar } from '@/components';

interface Props {
  children?: ReactNode;
  topNavbar?: ReactNode;
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
