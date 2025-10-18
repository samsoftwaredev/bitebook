import type { NextPage } from 'next';

import {
  AccentCard,
  AppIntroduction,
  CallToAction,
  Community,
  Features,
  Hero,
  HowItWorks,
  Meta,
} from '@/components';
import { MainLayout } from '@/components/Templates';

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Meta pageTitle="BiteBook App" />
      <Hero />
      <AppIntroduction />
      <HowItWorks />
      <Features />
      <AccentCard />
      <Community />
      <CallToAction />
    </MainLayout>
  );
};

export default Home;
