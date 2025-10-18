// Testimonials.tsx
import {
  Box,
  Container,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import * as React from 'react';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating?: number; // default 5
};

type Props = {
  title?: string;
  subtitle?: string;
  items?: Testimonial[];
};

const defaults: Testimonial[] = [
  {
    quote:
      '“RecipeBox has transformed how I meal plan. I save so much time and money, and my family loves the variety!”',
    name: 'Sarah Johnson',
    role: 'Busy Mom of 3',
  },
  {
    quote:
      '“The health scoring feature is amazing. I can easily find nutritious meals that fit my macros perfectly.”',
    name: 'Michael Chen',
    role: 'Fitness Enthusiast',
  },
  {
    quote:
      '“Tracking my grocery spending has never been easier. The receipt scanner is a game-changer!”',
    name: 'Emma Davis',
    role: 'Budget-Conscious Student',
  },
];

export default function Community({
  title = 'Loved by Home Cooks Everywhere',
  subtitle = 'Join thousands of people who have transformed their cooking experience',
  items = defaults,
}: Props) {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        // soft mint backdrop like the mock
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(7,51,42,.22)'
            : 'rgba(174,234,215,.18)',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={1.5}
          alignItems="center"
          sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}
        >
          <Typography variant="h4" fontWeight={800} letterSpacing="-0.01em">
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 820 }}
          >
            {subtitle}
          </Typography>
        </Stack>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {items.map((t, i) => (
            <Grid key={i} item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 3,
                  height: '100%',
                  boxShadow:
                    theme.palette.mode === 'dark'
                      ? '0 14px 36px rgba(0,0,0,.35)'
                      : '0 12px 30px rgba(2,33,25,.10)',
                }}
              >
                <Stack spacing={1.5}>
                  <Rating
                    value={t.rating ?? 5}
                    readOnly
                    size="small"
                    sx={{ color: 'warning.main' }}
                  />
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    {t.quote}
                  </Typography>
                  <Box>
                    <Typography fontWeight={700}>{t.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {t.role}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
