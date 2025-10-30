import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Link as MUILink,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import NextLink from 'next/link';
import React from 'react';

import { NAV_MAIN_LINKS } from '@/constants/nav';

const features = [
  {
    icon: <AutoAwesomeRoundedIcon />,
    title: 'Smart Recipe Suggestions',
    desc: 'Discover meals tailored to your taste, diet, and pantry—with helpful swaps and seasonal picks.',
    href: '/recipes',
    cta: 'Explore recipes',
  },
  {
    icon: <CalendarMonthRoundedIcon />,
    title: 'Visual Meal Planner',
    desc: 'Plan your week with an easy drag-and-drop calendar for breakfast, lunch, and dinner.',
    href: '/meal-planner',
    cta: 'Try the planner',
  },
  {
    icon: <SavingsRoundedIcon />,
    title: 'Grocery Spending Insights',
    desc: 'Track your food budget automatically and see where every dollar goes.',
    href: '/spending-tracker',
    cta: 'See spending tracker',
  },
  {
    icon: <HealthAndSafetyRoundedIcon />,
    title: 'Health Scoring',
    desc: 'Understand nutritional balance at a glance with simple, transparent scoring.',
    href: '/health-score',
    cta: 'Learn about scoring',
  },
  {
    icon: <ShoppingCartRoundedIcon />,
    title: 'Waste-Free Shopping',
    desc: 'Auto-generate precise shopping lists from your plan to reduce food waste.',
    href: '/shopping-list',
    cta: 'View shopping list',
  },
];

export default function AboutSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box component="main">
      {/* HERO */}
      <Box
        component="section"
        id="about-hero"
        sx={{
          py: { xs: 5, md: 8 },
          background:
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.success.main, 0.08)
              : 'linear-gradient(180deg,#F7FDFB 0%, #FFFFFF 65%)',
          borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            spacing={2}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            textAlign={{ xs: 'left', md: 'center' }}
          >
            <Chip
              label="About BiteBook"
              color="success"
              variant="outlined"
              sx={{ fontWeight: 700, alignSelf: { md: 'center' } }}
            />
            <Typography
              component="h1"
              variant={isMobile ? 'h4' : 'h3'}
              fontWeight={900}
              letterSpacing="-0.01em"
            >
              BiteBook — Your Culinary Companion for Smarter Eating
            </Typography>
            <Typography color="text.secondary" maxWidth={760}>
              BiteBook is the all-in-one{' '}
              <strong>meal planning and recipe discovery app</strong> that helps
              you plan smarter, spend less, and eat better. Discover recipes,
              build your weekly meal plan, generate a precise shopping list, and
              track grocery spending — all in one beautiful app.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{ pt: 1 }}
            >
              <Button
                component={NextLink}
                href={NAV_MAIN_LINKS.signup.link}
                variant="contained"
                color="success"
                size="large"
                sx={{ textTransform: 'none', fontWeight: 900 }}
              >
                Start Free
              </Button>
              <Button
                component={NextLink}
                href="/recipes"
                variant="outlined"
                startIcon={<SearchRoundedIcon />}
                size="large"
                sx={{ textTransform: 'none', fontWeight: 800 }}
              >
                Explore Recipes
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* WHAT IS BITEBOOK */}
      <Box
        component="section"
        id="what-is-bitebook"
        sx={{ py: { xs: 4, md: 6 } }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                component="h2"
                variant="h4"
                fontWeight={800}
                gutterBottom
              >
                What is BiteBook?
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                BiteBook is a **culinary companion** that replaces guesswork
                with a simple, visual system. Plan your week, reduce food waste
                with accurate shopping lists, and make informed choices with
                clear health scores and spending insights. It’s everything you
                need to cook confidently — on your terms.
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <MUILink
                  component={NextLink}
                  href="/meal-planner"
                  underline="hover"
                  color="success.main"
                  variant="body2"
                >
                  Explore the Meal Planner →
                </MUILink>
                <MUILink
                  component={NextLink}
                  href="/spending-tracker"
                  underline="hover"
                  color="success.main"
                  variant="body2"
                >
                  See Spending Tracker →
                </MUILink>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              {/* Placeholder media block; replace with screenshot */}
              <Box
                sx={{
                  height: 240,
                  borderRadius: 2,
                  background:
                    theme.palette.mode === 'dark'
                      ? alpha(theme.palette.success.light, 0.08)
                      : alpha(theme.palette.success.main, 0.08),
                  border: `1px solid ${alpha(theme.palette.success.main, 0.25)}`,
                  display: 'grid',
                  placeItems: 'center',
                  color: 'success.main',
                  fontWeight: 800,
                }}
              >
                App preview / screenshot
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* WHY CHOOSE */}
      <Box
        component="section"
        id="why-bitebook"
        sx={{
          py: { xs: 4, md: 6 },
          backgroundColor: alpha(theme.palette.text.primary, 0.02),
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            fontWeight={800}
            textAlign="center"
            gutterBottom
          >
            Why Choose BiteBook?
          </Typography>
          <Typography color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
            Cook with confidence. These features help you plan visually, save
            time, and spend less.
          </Typography>

          <Grid container spacing={2.5}>
            {features.map((f) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={f.title}>
                <Card
                  variant="outlined"
                  sx={{ height: '100%', borderRadius: 2 }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{ mb: 1 }}
                    >
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          display: 'grid',
                          placeItems: 'center',
                          color: 'success.main',
                          bgcolor: alpha(theme.palette.success.main, 0.08),
                        }}
                      >
                        {f.icon}
                      </Box>
                      <Typography variant="h6" fontWeight={800}>
                        {f.title}
                      </Typography>
                    </Stack>
                    <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                      {f.desc}
                    </Typography>
                    <MUILink
                      component={NextLink}
                      href={f.href}
                      underline="hover"
                      color="success.main"
                      variant="body2"
                    >
                      {f.cta} →
                    </MUILink>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* MISSION */}
      <Box component="section" id="mission" sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Stack spacing={1}>
            <Typography component="h2" variant="h4" fontWeight={800}>
              Our Mission
            </Typography>
            <Typography color="text.secondary" maxWidth={820}>
              We believe good food fuels good living. BiteBook empowers people
              to cook smarter, save money, and live more sustainably — one bite
              at a time. By blending thoughtful design with practical tools, we
              help you fall in love with your kitchen again.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* FINAL CTA */}
      <Box
        component="section"
        id="get-started"
        sx={{
          py: { xs: 4, md: 6 },
          background:
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.success.main, 0.08)
              : alpha(theme.palette.success.main, 0.06),
          borderTop: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                component="h2"
                variant="h5"
                fontWeight={900}
                gutterBottom
              >
                Start Cooking Smarter Today
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Join thousands of home cooks planning meals, shopping with
                purpose, and eating better — in one beautiful app.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button
                  component={NextLink}
                  href={NAV_MAIN_LINKS.signup.link}
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{ textTransform: 'none', fontWeight: 900 }}
                >
                  Create Your Free Account
                </Button>
                <Button
                  component={NextLink}
                  href="/meal-planner"
                  variant="outlined"
                  size="large"
                  sx={{ textTransform: 'none', fontWeight: 800 }}
                >
                  Try the Meal Planner
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sticky mobile CTA */}
      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          display: { xs: 'block', sm: 'none' },
          borderTop: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
          backdropFilter: 'blur(6px)',
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          p: 1,
        }}
      >
        <Container maxWidth="lg">
          <Button
            fullWidth
            component={NextLink}
            href={NAV_MAIN_LINKS.signup.link}
            variant="contained"
            color="success"
            size="large"
            sx={{ textTransform: 'none', fontWeight: 900 }}
          >
            Start Free
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
