import type { NextPage } from 'next';

import { Meta, PageNotFound } from '@/components';

const Page404: NextPage = () => {
  debugger;
  return (
    <div>
      <Meta pageTitle="Page Not Found" />
      <PageNotFound />
    </div>
  );
};

export default Page404;
