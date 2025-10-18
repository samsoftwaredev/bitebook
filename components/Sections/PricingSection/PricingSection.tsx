// PricingPage.tsx
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  SvgIcon,
  Typography,
  alpha,
} from '@mui/material';
import * as React from 'react';

type FeatureRow = {
  label: string;
  included?: boolean; // true = check, false = strike/disabled
  premiumOnly?: boolean; // small diamond icon like mock
};

type Plan = {
  name: 'Free' | 'Premium';
  tagline: string;
  price: string; // "$0" or "$9.99"
  priceNote: string; // "/ forever" or "/ per month"
  features: FeatureRow[];
  highlight?: boolean;
};

const FREE_PLAN: Plan = {
  name: 'Free',
  tagline: 'Perfect for casual home cooks',
  price: '$0',
  priceNote: '/ forever',
  features: [
    { label: 'Browse 500+ recipes', included: true },
    { label: 'Save favorite recipes', included: true },
    { label: 'Weekly meal planner', included: true },
    { label: 'Smart shopping lists', included: true },
    { label: 'Health score ratings', included: true },
    { label: 'Recipe customization', included: true },
    { label: 'Ingredient aggregation', included: true },
    { label: 'Expiration reminders', included: true },
    { label: 'Receipt scanning', included: false },
    { label: 'Spending analytics', included: false },
    { label: 'Monthly expense reports', included: false },
    { label: 'Category breakdowns', included: false },
    { label: 'Annual spending overview', included: false },
    { label: 'Priority support', included: false },
  ],
};

const PREMIUM_PLAN: Plan = {
  name: 'Premium',
  tagline: 'For serious planners who want full control',
  price: '$9.99',
  priceNote: '/ per month',
  highlight: true,
  features: [
    { label: 'Everything in Free, plus:', included: true },
    { label: 'AI Receipt Scanning', included: true, premiumOnly: true },
    { label: 'Advanced Spending Analytics', included: true, premiumOnly: true },
    { label: 'Monthly & Annual Reports', included: true, premiumOnly: true },
    { label: 'Category Breakdowns', included: true, premiumOnly: true },
    { label: 'Budget Tracking', included: true },
    { label: 'Spending Trends', included: true },
    { label: 'Store Comparisons', included: true },
    { label: 'Priority Support', included: true },
    { label: 'Custom Categories', included: true },
    { label: 'Mobile Receipts', included: true },
    { label: 'Cloud Backup', included: true },
    { label: 'Export Data', included: true },
  ],
};

function PlanCard({ plan, onSelect }: { plan: Plan; onSelect: () => void }) {
  return (
    <Paper
      sx={{
        position: 'relative',
        p: 2,
        borderRadius: 3,
        height: '100%',
        border: (t) =>
          plan.highlight
            ? `2px solid ${alpha(t.palette.success.main, 0.6)}`
            : `1px solid ${alpha(t.palette.text.primary, 0.12)}`,
        boxShadow: plan.highlight
          ? '0 16px 40px rgba(0,0,0,.16)'
          : '0 10px 28px rgba(0,0,0,.08)',
      }}
    >
      {/* Ribbon for Most Popular */}
      {plan.highlight && (
        <Chip
          label="MOST POPULAR"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            fontWeight: 800,
            bgcolor: '#0FB77A',
            color: '#fff',
          }}
        />
      )}

      {/* Header */}
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
        {plan.highlight ? (
          <DiamondRoundedIcon color="success" />
        ) : (
          <LockRoundedIcon sx={{ color: 'text.secondary' }} />
        )}
        <Box>
          <Typography fontWeight={900}>{plan.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {plan.tagline}
          </Typography>
        </Box>
      </Stack>

      {/* Price */}
      <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: 1 }}>
        <Typography
          variant="h4"
          fontWeight={900}
          sx={{ letterSpacing: '-0.01em' }}
        >
          {plan.price}
        </Typography>
        <Typography color="text.secondary">{plan.priceNote}</Typography>
      </Stack>

      <Divider sx={{ my: 1 }} />

      {/* Features */}
      <Stack spacing={1} sx={{ mb: 2 }}>
        {plan.features.map((f, i) => (
          <Stack key={i} direction="row" spacing={1} alignItems="center">
            {f.included ? (
              <CheckRoundedIcon fontSize="small" sx={{ color: '#16A34A' }} />
            ) : (
              <CloseRoundedIcon
                fontSize="small"
                sx={{ color: alpha('#000', 0.35) }}
              />
            )}
            <Typography
              variant="body2"
              sx={{
                ...(f.included
                  ? {}
                  : { color: 'text.disabled', textDecoration: 'line-through' }),
                fontWeight: i === 0 && plan.highlight ? 800 : 500,
              }}
            >
              {f.label}
            </Typography>
            {f.premiumOnly && f.included && (
              <SvgIcon
                component={DiamondRoundedIcon}
                sx={{ fontSize: 16, color: '#14B8A6', ml: 0.25 }}
              />
            )}
          </Stack>
        ))}
      </Stack>

      {/* CTA */}
      {plan.highlight ? (
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={onSelect}
          startIcon={<WorkspacePremiumRoundedIcon />}
          sx={{
            py: 1.1,
            borderRadius: 2,
            fontWeight: 900,
            background: 'linear-gradient(180deg,#0FB77A 0%, #0A7F56 100%)',
            '&:hover': { filter: 'brightness(.98)' },
          }}
        >
          Upgrade Now
        </Button>
      ) : (
        <Button
          fullWidth
          size="large"
          disabled
          sx={{ py: 1.1, borderRadius: 2 }}
        >
          Current Plan
        </Button>
      )}
    </Paper>
  );
}

export default function PricingPage() {
  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        {/* Eyebrow */}
        <Stack alignItems="center" sx={{ mb: 1 }}>
          <Chip
            size="small"
            icon={<CheckRoundedIcon sx={{ fontSize: 16 }} />}
            label="Simple, Transparent Pricing"
            sx={{
              bgcolor: alpha('#0FB77A', 0.12),
              color: '#0A7F56',
              fontWeight: 700,
            }}
          />
        </Stack>

        {/* Title */}
        <Stack
          spacing={1}
          alignItems="center"
          sx={{ textAlign: 'center', mb: 3 }}
        >
          <Typography variant="h4" fontWeight={900} letterSpacing="-0.01em">
            Choose Your Plan
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 680 }}>
            Start free and upgrade anytime to unlock powerful spending tracking
            features
          </Typography>
        </Stack>

        {/* Plans */}
        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <PlanCard plan={FREE_PLAN} onSelect={() => {}} />
          </Grid>
          <Grid item xs={12} md={6}>
            <PlanCard
              plan={PREMIUM_PLAN}
              onSelect={() => console.log('upgrade')}
            />
          </Grid>
        </Grid>

        {/* Why Upgrade band */}
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            textAlign: 'center',
            color: '#ECFDF5',
            background: 'linear-gradient(180deg,#0E7C5B 0%, #0A6E52 100%)',
            boxShadow: '0 16px 40px rgba(0,0,0,.16)',
            mb: 4,
          }}
        >
          <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
            Why Upgrade to Premium?
          </Typography>
          <Typography sx={{ opacity: 0.9, mb: { xs: 2, md: 3 } }}>
            Take complete control of your food spending with powerful analytics
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Stack spacing={1} alignItems="center">
                <WorkspacePremiumRoundedIcon />
                <Typography fontWeight={800}>Smart Receipt Scanning</Typography>
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.9, maxWidth: 320 }}
                >
                  Snap photos of receipts and let AI extract all items and
                  prices automatically
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={1} alignItems="center">
                <AssessmentRoundedIcon />
                <Typography fontWeight={800}>Spending Analytics</Typography>
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.9, maxWidth: 320 }}
                >
                  Beautiful charts showing monthly trends, category breakdowns,
                  and annual totals
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={1} alignItems="center">
                <CalendarMonthRoundedIcon />
                <Typography fontWeight={800}>Annual Overview</Typography>
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.9, maxWidth: 320 }}
                >
                  Track your entire year of food spending and see where you can
                  save money
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* FAQ heading placeholder */}
        <Typography variant="h6" fontWeight={900} sx={{ textAlign: 'center' }}>
          Frequently Asked Questions
        </Typography>
        <Typography color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
          (Add your accordion of questions here)
        </Typography>
      </Container>
    </Box>
  );
}
