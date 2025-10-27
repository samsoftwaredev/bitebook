import { Typography } from '@mui/material';
import type { NextPage } from 'next';

import { Meta } from '@/components';
import { MainLayout } from '@/components/Templates';

const Contact: NextPage = () => {
  return (
    <MainLayout>
      <Meta pageTitle="Contact Us" />
      <Typography>Contact Page</Typography>
    </MainLayout>
  );
};

export default Contact;
