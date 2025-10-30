import type { NextPage } from 'next';

import { Meta } from '@/components';

const Page500: NextPage = () => {
  return (
    <div>
      <Meta pageTitle="Internal Server Error" />
      <h1>500 - Server-side error occurred</h1>
    </div>
  );
};

export default Page500;
