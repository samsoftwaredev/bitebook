import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import Link from 'next/link';

import { NAV_MAIN_LINKS } from '@/constants/nav';

type Stat = { value: string; label: string };

const defaultStats: Stat[] = [
  { value: '500+', label: 'Delicious Recipes' },
  { value: '10K+', label: 'Active Users' },
  { value: '95+', label: 'Health Score Available' },
];

const CallToAction = () => {
  const theme = useTheme();

  const page = {
    title: 'Ready to Transform Your Kitchen?',
    subtitleTop:
      'Start discovering recipes, planning meals, and tracking your spending today.',
    subtitleBottom: 'No credit card required.',
    ctaText: 'Start Cooking Smarter',
    stats: defaultStats,
  };

  const bg = theme.palette.mode === 'dark' ? '#0B5A47' : '#0F8C6B'; // rich brandy green

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        background: bg,
        color: '#ECFDF5',
      }}
    >
      <Container maxWidth="lg">
        <Stack alignItems="center" textAlign="center" spacing={2}>
          <Typography
            variant="h4"
            fontWeight={800}
            letterSpacing="-0.01em"
            sx={{ color: '#F0FDF9' }}
          >
            {page.title}
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {page.subtitleTop}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'success.light',
              opacity: 0.85,
              mb: 1,
            }}
          >
            {page.subtitleBottom}
          </Typography>

          <Button
            size="large"
            variant="contained"
            component={Link}
            href={NAV_MAIN_LINKS.signup.link}
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              mt: 1,
              borderRadius: 999,
              px: 2.5,
              backgroundColor: '#FFFFFF',
              color: bg,
              boxShadow: `0 10px 24px ${alpha('#000', 0.25)}`,
              '&:hover': {
                backgroundColor: alpha('#FFFFFF', 0.92),
              },
            }}
          >
            {page.ctaText}
          </Button>

          {/* Divider */}
          <Box
            sx={{
              width: { xs: '100%', sm: '80%', md: '70%' },
              height: '2px',
              my: { xs: 4, md: 5 },
              backgroundColor: 'success.light',
            }}
          />

          {/* Stats */}
          <Grid
            container
            spacing={{ xs: 3, md: 6 }}
            sx={{ width: { xs: '100%', sm: '90%', md: '70%' }, mx: 'auto' }}
          >
            {page.stats.map((s, i) => (
              <Grid key={i} item xs={12} sm={4}>
                <Stack spacing={0.5} alignItems="center">
                  <Typography
                    sx={{
                      fontSize: { xs: '1.6rem', md: '2.8rem' },
                      fontWeight: 800,
                      lineHeight: 1.1,
                      color: '#FFFFFF',
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    {s.label}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default CallToAction;
