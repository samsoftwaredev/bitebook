import { Grass } from '@mui/icons-material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
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

type FeatureItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string; // CSS color or gradient for the top strip and icon tile
};

type FeaturesGridProps = {
  title?: string;
  subtitle?: string;
  items?: FeatureItem[];
};

const defaultItems: FeatureItem[] = [
  {
    title: 'AI-Powered Recipe Discovery',
    description:
      'Browse hundreds of recipes with intelligent health scores and dietary filters',
    icon: <AutoAwesomeRoundedIcon />,
    accent: 'linear-gradient(90deg,#F43F5E,#A855F7)', // pink → purple
  },
  {
    title: 'Smart Meal Planning',
    description:
      'Plan your weekly meals with automatic cost calculation and ingredient aggregation',
    icon: <EventNoteRoundedIcon />,
    accent: 'linear-gradient(90deg,#2563EB,#22D3EE)', // blue → cyan
  },
  {
    title: 'Interactive Shopping Lists',
    description:
      'Check off items as you shop and track expiration dates to minimize waste',
    icon: <ShoppingCartRoundedIcon />,
    accent: 'linear-gradient(90deg,#10B981,#22C55E)', // teal → green
  },
  {
    title: 'Receipt Scanning',
    description:
      'Scan receipts with AI to automatically track spending and analyze habits',
    icon: <ReceiptLongRoundedIcon />,
    accent: 'linear-gradient(90deg,#FB923C,#F59E0B)', // orange → amber
  },
  {
    title: 'Health Scoring',
    description:
      'Every recipe rated 0–100 for nutritional value to help you eat healthier',
    icon: <Grass />,
    accent: 'linear-gradient(90deg,#22C55E,#16A34A)', // greens
  },
  {
    title: 'Expense Analytics',
    description:
      'Beautiful charts and insights to understand your grocery spending patterns',
    icon: <ShowChartRoundedIcon />,
    accent: 'linear-gradient(90deg,#8B5CF6,#A855F7)', // purple
  },
];

const AccentCard = ({ item }: { item: FeatureItem }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        p: { xs: 2.5, md: 3 },
        borderRadius: 1,
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        height: '100%',
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 14px 36px rgba(0,0,0,.35)'
            : '0 10px 28px rgba(2,33,25,.10)',
        // top colored accent bar
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 6,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          background: item.accent,
        },
      }}
    >
      <Stack direction="row" spacing={2.25} alignItems="flex-start">
        <Avatar
          variant="rounded"
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(2,33,25,0.04)',
            color: 'text.primary',
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 6px 16px rgba(0,0,0,.35)'
                : '0 6px 16px rgba(2,33,25,.10)',
            // thin gradient border look
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 8,
              padding: '1px',
              background: item.accent,
              WebkitMask:
                'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            },
          }}
        >
          {item.icon}
        </Avatar>

        <Box>
          <Typography fontWeight={700} sx={{ mb: 0.5 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

const FeaturesGrid = ({
  title = 'Everything You Need to Cook Smarter',
  subtitle = 'Powerful features that make meal planning, shopping, and cooking a breeze',
  items = defaultItems,
}: FeaturesGridProps) => {
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
            sx={{ maxWidth: 800 }}
          >
            {subtitle}
          </Typography>
        </Stack>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {items.map((it, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4}>
              <AccentCard item={it} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesGrid;
