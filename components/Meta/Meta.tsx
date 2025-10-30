import Head from 'next/head';

import { COMPANY } from '@/constants/company';

interface Props {
  pageTitle?: string;
  description?: string;
  canonicalUrl?: string;
}

const Meta = ({
  pageTitle = `${COMPANY.name} - Your Complete Culinary Companion`,
  description = 'Discover recipes, plan meals, track grocery spending, and reduce food waste—all in one beautiful app. Cook smarter, save money, and eat healthier with BiteBook.',
  canonicalUrl = 'https://bitebook.app',
}: Props) => {
  const title = `${pageTitle} | ${COMPANY.name}`;
  const imageUrl = `${canonicalUrl}/og-image.jpg`;

  return (
    <Head>
      {/* PWA and theme */}
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#0fb77a" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="meal planning app, recipe organizer, grocery list app, track food spending, reduce food waste, cooking planner, budget meal ideas, healthy recipes, BiteBook"
      />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="BiteBook" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta
        property="og:image:alt"
        content="BiteBook - Your Complete Culinary Companion"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@bitebook" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content="BiteBook App preview" />

      {/* Apple Icons */}
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  );
};

export default Meta;
