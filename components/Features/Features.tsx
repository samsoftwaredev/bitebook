import { Grass } from '@mui/icons-material';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

type Feature = {
  icon: React.ReactNode;
  metric: string; // e.g., "3+ hours/week"
  subhead: string; // e.g., "Save Time"
  description: string; // supporting copy
};

type Props = {
  title?: string;
  subtitle?: string;
  items?: Feature[];
};

const defaultItems: Feature[] = [
  {
    icon: <AccessTimeRoundedIcon />,
    metric: '3+ hours/week',
    subhead: 'Save Time',
    description: 'Automated meal planning and smart shopping lists',
  },
  {
    icon: <AttachMoneyRoundedIcon />,
    metric: '30% savings',
    subhead: 'Save Money',
    description: 'Track spending and minimize food waste',
  },
  {
    icon: <Grass />,
    metric: '95+ health score',
    subhead: 'Eat Healthier',
    description: 'Discover nutritious recipes tailored to your diet',
  },
];

const Features = ({
  title = 'Why Choose RecipeBox?',
  subtitle = 'Transform your cooking experience with powerful tools designed to save you time and money',
  items = defaultItems,
}: Props) => {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
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
            sx={{ maxWidth: 720 }}
          >
            {subtitle}
          </Typography>
        </Stack>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {items.map((f, i) => (
            <Grid key={i} item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  px: { xs: 3, md: 4 },
                  py: { xs: 3, md: 4 },
                  borderRadius: 3,
                  boxShadow:
                    theme.palette.mode === 'dark'
                      ? '0 16px 40px rgba(0,0,0,.35)'
                      : '0 12px 30px rgba(2,33,25,.10)',
                }}
              >
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Avatar
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor:
                        theme.palette.mode === 'dark'
                          ? 'rgba(15,183,122,.18)'
                          : 'rgba(15,183,122,.12)',
                      color: 'primary.dark',
                    }}
                  >
                    {f.icon}
                  </Avatar>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.6rem', md: '1.8rem' },
                        fontWeight: 800,
                        color: 'primary.main',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.1,
                      }}
                    >
                      {f.metric}
                    </Typography>
                    <Typography fontWeight={700} sx={{ mt: 0.5 }}>
                      {f.subhead}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {f.description}
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
};

export default Features;
