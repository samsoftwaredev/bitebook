import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import Head from 'next/head';

const steps = [
  {
    id: 'step-sign-up',
    title: 'Create Your Free Account',
    desc: 'Sign up to start using BiteBook — your complete culinary companion to discover recipes, plan meals, and track grocery spending.',
  },
  {
    id: 'step-plan-meals',
    title: 'Plan and Personalize Your Meals',
    desc: 'Browse 500+ healthy, budget-friendly recipes and automatically build smart shopping lists that help reduce food waste.',
  },
  {
    id: 'step-cook-smarter',
    title: 'Cook Smarter and Save Money',
    desc: 'Use BiteBook’s spending tracker to monitor your food costs, stay organized, and enjoy nutritious meals that fit your goals.',
  },
];

const howToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to use BiteBook — the all-in-one meal planning and recipe app',
  description:
    'Three simple steps to cook smarter with BiteBook: create your free account, plan and personalize your meals, and track your grocery spending to save money and reduce food waste.',
  totalTime: 'PT5M',
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.desc,
    url: `#${s.id}`,
  })),
};

const HowItWorks = () => {
  return (
    <>
      {/* JSON-LD for rich results */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
        />
      </Head>

      <Box
        id="how-it-works"
        component="section"
        aria-labelledby="how-it-works-title"
        sx={{ mb: 8, display: 'none' }}
      >
        <Typography
          id="how-it-works-title"
          component="h2"
          variant="h4"
          gutterBottom
        >
          How It Works
        </Typography>

        {/* Ordered steps */}
        <Grid
          component="ol"
          container
          spacing={4}
          sx={{ listStyle: 'decimal', pl: { xs: 3, md: 4 } }}
        >
          {steps.map((step, i) => (
            <Grid
              component="li"
              size={{ xs: 12, md: 4 }}
              key={step.id}
              id={step.id}
              sx={{
                listStylePosition: 'outside',
                '&::marker': { color: 'transparent' },
              }}
            >
              <Card
                sx={{ height: '100%' }}
                elevation={3}
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <CardContent>
                  <meta itemProp="position" content={String(i + 1)} />
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    itemProp="name"
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="body2" itemProp="text">
                    {step.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default HowItWorks;
