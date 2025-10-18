// PremiumPaywall.tsx
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import { Box, Button, Paper, Stack, Typography, alpha } from '@mui/material';
import * as React from 'react';

type Feature = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone?: 'mint' | 'blue' | 'purple';
};

type Props = {
  title?: string; // "Premium Feature"
  subtitle?: string; // "Spending Tracker is available..."
  headline?: string; // "Unlock Powerful Spending Analytics"
  priceText?: string; // "Just $9.99/month"
  priceSub?: string; // "Cancel anytime..."
  onUpgrade?: () => void;
  onBack?: () => void;
  features?: Feature[];
};

const defaultFeatures: Feature[] = [
  {
    icon: <CameraAltRoundedIcon />,
    title: 'AI Receipt Scanning',
    desc: 'Snap a photo and automatically extract items, quantities, and prices',
    tone: 'mint',
  },
  {
    icon: <ShowChartRoundedIcon />,
    title: 'Monthly & Annual Reports',
    desc: 'See your spending trends over time with beautiful interactive charts',
    tone: 'blue',
  },
  {
    icon: <CategoryRoundedIcon />,
    title: 'Category Breakdowns',
    desc: 'Understand where your money goes with detailed category analytics',
    tone: 'purple',
  },
];

function FeatureRow({ f }: { f: Feature }) {
  const bg =
    f.tone === 'blue'
      ? (t: any) => alpha('#60A5FA', t.palette.mode === 'dark' ? 0.12 : 0.12)
      : f.tone === 'purple'
        ? (t: any) => alpha('#C084FC', t.palette.mode === 'dark' ? 0.12 : 0.12)
        : (t: any) => alpha('#34D399', t.palette.mode === 'dark' ? 0.12 : 0.12);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: 2,
        backgroundColor: bg as any,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1.25,
            display: 'grid',
            placeItems: 'center',
            bgcolor: alpha('#000', 0.06),
          }}
        >
          {f.icon}
        </Box>
        <Box>
          <Typography fontWeight={800}>{f.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {f.desc}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default function PremiumPaywall({
  title = 'Premium Feature',
  subtitle = 'Spending Tracker is available on Premium plan only',
  headline = 'Unlock Powerful Spending Analytics',
  priceText = 'Just $9.99/month',
  priceSub = 'Cancel anytime, no hidden fees',
  onUpgrade,
  onBack,
  features = defaultFeatures,
}: Props) {
  return (
    <Paper
      sx={{
        maxWidth: 640,
        mx: 'auto',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0,0,0,.16)',
        border: (t) => `2px solid ${alpha(t.palette.success.main, 0.3)}`,
      }}
    >
      {/* Header gradient */}
      <Box
        sx={{
          p: 4,
          textAlign: 'center',
          color: '#fff',
          background: 'linear-gradient(180deg,#0FB77A 0%, #0A7F56 100%)',
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            mx: 'auto',
            mb: 1.5,
            display: 'grid',
            placeItems: 'center',
            backgroundColor: alpha('#fff', 0.18),
          }}
        >
          <LockRoundedIcon sx={{ fontSize: 36 }} />
        </Box>
        <Typography variant="h5" fontWeight={900}>
          {title}
        </Typography>
        <Typography sx={{ opacity: 0.9 }}>{subtitle}</Typography>
      </Box>

      {/* Body */}
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h6"
          fontWeight={900}
          textAlign="center"
          sx={{ mb: 1 }}
        >
          {headline}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 2.5 }}
        >
          Track every dollar you spend on food with AI-powered receipt scanning,
          beautiful charts, and annual reports.
        </Typography>

        <Stack spacing={1.25} sx={{ mb: 2.5 }}>
          {features.map((f, i) => (
            <FeatureRow key={i} f={f} />
          ))}
        </Stack>

        {/* Pricing banner */}
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            textAlign: 'center',
            color: '#fff',
            background: 'linear-gradient(180deg,#0E7C5B 0%, #0A6E52 100%)',
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 0.5 }}
          >
            <WorkspacePremiumRoundedIcon />
            <Typography fontWeight={900}>{priceText}</Typography>
          </Stack>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {priceSub}
          </Typography>
        </Paper>

        {/* CTAs */}
        <Stack spacing={1.25} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onUpgrade}
            startIcon={<WorkspacePremiumRoundedIcon />}
            sx={{
              py: 1.25,
              borderRadius: 2,
              fontWeight: 900,
              background: 'linear-gradient(180deg,#0FB77A 0%, #0A7F56 100%)',
              '&:hover': { filter: 'brightness(.98)' },
            }}
          >
            Upgrade to Premium
          </Button>

          <Button
            variant="contained"
            size="large"
            onClick={onBack}
            sx={{
              py: 1.25,
              borderRadius: 2,
              fontWeight: 800,
              color: 'text.primary',
              backgroundColor: '#FFE847',
              '&:hover': { backgroundColor: '#FDE047' },
            }}
          >
            Back to Recipes
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
