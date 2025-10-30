import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  alpha,
} from '@mui/material';
import * as React from 'react';

import { PageHeader } from '@/components';
import { NutritionPer100, scoreFood } from '@/utils/foodScore';

const MetricCard = ({
  icon,
  label,
  value,
  gradient,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  gradient?: string; // if omitted -> solid brand green
}) => (
  <Paper
    sx={{
      p: 2,
      borderRadius: 1,
      color: '#fff',
      background: gradient ?? '#0F8C6B',
      boxShadow: '0 14px 36px rgba(0,0,0,.15)',
      minHeight: 84,
    }}
  >
    <Stack direction="row" spacing={1.5} alignItems="center">
      {React.createElement(icon)}
      <Box>
        <Typography variant="caption" sx={{ opacity: 0.9 }}>
          {label}
        </Typography>
        <Typography variant="h5" fontWeight={900} lineHeight={1}>
          {value}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

const EmptyChartCard = ({ title, note }: { title: string; note: string }) => (
  <Paper sx={{ borderRadius: 1, overflow: 'hidden' }}>
    <Box
      sx={{
        px: 2,
        py: 1.25,
        borderBottom: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
      }}
    >
      <Typography fontWeight={800}>{title}</Typography>
    </Box>
    <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
      <Typography sx={{ mb: 0.5 }}>No spending data available yet</Typography>
      <Typography variant="body2">{note}</Typography>
    </Box>
  </Paper>
);

const SpendingTrackerPage = () => {
  const [range, setRange] = React.useState<'all' | '30' | '90' | 'ytd'>('all');

  React.useEffect(() => {
    const nutrition: NutritionPer100 = {
      energyKJ: 1046,
      sugarsG: 65,
      satFatG: 0,
      sodiumMG: 0,
      fiberG: 0,
      proteinG: 0,
      fvnlPercent: undefined,
    };
    console.log(
      'Current food score function:',
      scoreFood({
        category: 'food',
        nutrition,
        additives: [],
        isCertifiedOrganic: false,
      }),
    );
  }, [range]);

  return (
    <>
      {/* Header */}
      <PageHeader
        title="Spending Tracker"
        subTitle="Track your grocery expenses by scanning receipts"
      >
        <Button
          variant="contained"
          color="success"
          startIcon={<AddRoundedIcon />}
          sx={{ fontWeight: 800 }}
        >
          Scan Receipt
        </Button>
      </PageHeader>

      {/* KPIs */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <MetricCard
            icon={AttachMoneyRoundedIcon}
            label="Total Spent"
            value="$0.00"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            icon={CalendarMonthRoundedIcon}
            label="Receipts Scanned"
            value={0}
            gradient="linear-gradient(90deg,#2563EB,#4F46E5)"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            icon={ShowChartRoundedIcon}
            label="Average per Receipt"
            value="$0.00"
            gradient="linear-gradient(90deg,#C026D3,#EC4899)"
          />
        </Grid>
      </Grid>

      {/* Range selector */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Select
          size="small"
          value={range}
          onChange={(e) => setRange(e.target.value as any)}
          sx={{
            bgcolor: '#FFE847',
            '& .MuiSelect-select': { fontWeight: 700 },
          }}
        >
          <MenuItem value="all">All Time</MenuItem>
          <MenuItem value="30">Last 30 Days</MenuItem>
          <MenuItem value="90">Last 90 Days</MenuItem>
          <MenuItem value="ytd">Year to Date</MenuItem>
        </Select>
      </Stack>

      {/* Charts row */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <EmptyChartCard
            title="Monthly Spending Trends"
            note="Start scanning receipts to see your trends"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <EmptyChartCard
            title="Category Breakdown"
            note="No spending data for selected period"
          />
        </Grid>
      </Grid>

      {/* Recent Receipts */}
      <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
        Recent Receipts
      </Typography>
      <Paper sx={{ p: { xs: 3, md: 6 }, borderRadius: 1, textAlign: 'center' }}>
        <ReceiptLongRoundedIcon
          sx={{ fontSize: 56, color: 'text.disabled', mb: 1 }}
        />
        <Typography fontWeight={800} sx={{ mb: 0.5 }}>
          No receipts yet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Start scanning receipts to track your spending
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<PhotoCameraRoundedIcon />}
          sx={{ borderRadius: 1, fontWeight: 800 }}
        >
          Scan Your First Receipt
        </Button>
      </Paper>
    </>
  );
};

export default SpendingTrackerPage;
