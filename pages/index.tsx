import type { NextPage } from 'next';

import {
  AppIntroduction,
  CallToAction,
  Community,
  Features,
  Hero,
  HowItWorks,
  Meta,
  WhyPrayRosary,
} from '@/components';
import RosaryWeapon from '@/components/RosaryWeapon';
import { MainLayout } from '@/components/Templates';

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Meta pageTitle="BiteBook App" />
      <Hero />
      <AppIntroduction />
      <HowItWorks />
      <Features />
      <WhyPrayRosary />
      <Community />
      <CallToAction />
    </MainLayout>
  );
};

export default Home;
