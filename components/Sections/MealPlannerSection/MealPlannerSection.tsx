// MealPlannerPage.tsx
import AttachMoneyRounded from '@mui/icons-material/AttachMoneyRounded';
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded';
import LocalMallRounded from '@mui/icons-material/LocalMallRounded';
import SaveRounded from '@mui/icons-material/SaveRounded';
import SendRounded from '@mui/icons-material/SendRounded';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded';
import {
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  SvgIcon,
  Typography,
  alpha,
} from '@mui/material';
import React from 'react';

type MealSlot = 'breakfast' | 'lunch' | 'dinner';
type DayPlan = {
  dateLabel: string; // "Monday, Oct 13"
  meals: Record<MealSlot, string>; // recipe name or "Skip meal"
};

const RECIPES = [
  'Skip meal',
  'Quinoa Buddha Bowl (Copy)',
  'Spicy Korean Beef Bowl',
  'Creamy Mushroom Risotto',
  'Thai Green Curry with Shrimp',
  'Cajun Shrimp Pasta',
  'Quinoa Buddha Bowl',
  'Moroccan Lamb Tagine',
  'Classic Margherita Pizza',
  'Mexican Street Tacos',
];

const START_WEEK = 'Week of October 13, 2025';

const initialWeek: DayPlan[] = [
  {
    dateLabel: 'Monday, Oct 13',
    meals: {
      breakfast: 'Skip meal',
      lunch: 'Mediterranean Chickpea Salad',
      dinner: 'Skip meal',
    } as any,
  },
  {
    dateLabel: 'Tuesday, Oct 14',
    meals: {
      breakfast: 'Skip meal',
      lunch: 'Mediterranean Chickpea Salad (Copy)',
      dinner: 'Skip meal',
    } as any,
  },
  {
    dateLabel: 'Wednesday, Oct 15',
    meals: {
      breakfast: 'Blueberry Pancakes',
      lunch: 'Quinoa Buddha Bowl',
      dinner: 'Skip meal',
    } as any,
  },
  {
    dateLabel: 'Thursday, Oct 16',
    meals: {
      breakfast: 'Blueberry Pancakes',
      lunch: 'Mediterranean Chickpea Salad (Copy)',
      dinner: 'Skip meal',
    } as any,
  },
  {
    dateLabel: 'Friday, Oct 17',
    meals: {
      breakfast: 'Skip meal',
      lunch: 'Skip meal',
      dinner: 'Skip meal',
    } as any,
  },
  {
    dateLabel: 'Saturday, Oct 18',
    meals: {
      breakfast: 'Skip meal',
      lunch: 'Skip meal',
      dinner: 'Skip meal',
    } as any,
  },
  {
    dateLabel: 'Sunday, Oct 19',
    meals: {
      breakfast: 'Skip meal',
      lunch: 'Skip meal',
      dinner: 'Skip meal',
    } as any,
  },
];

type Item = {
  name: string;
  qty: string;
  days?: number; // “2d”
  usedIn: string[];
  badge?: string; // x2, x4 etc.
};

const SHOPPING: Item[] = [
  {
    name: 'Ground beef',
    qty: '1 lb',
    days: 2,
    usedIn: ['Spicy Korean Beef Bowl'],
  },
  {
    name: 'Avocado',
    qty: '2',
    days: 3,
    badge: 'x2',
    usedIn: ['Quinoa Buddha Bowl', 'Quinoa Buddha Bowl (Copy)'],
  },
  {
    name: 'Cherry tomatoes',
    qty: '4 cups',
    days: 5,
    badge: 'x4',
    usedIn: [
      'Mediterranean Chickpea Salad',
      'Mediterranean Chickpea Salad (Copy)',
    ],
  },
  {
    name: 'Kale',
    qty: '4 cups',
    days: 5,
    badge: 'x2',
    usedIn: ['Quinoa Buddha Bowl', 'Quinoa Buddha Bowl (Copy)'],
  },
  {
    name: 'Cucumber',
    qty: '2 large',
    days: 7,
    badge: 'x4',
    usedIn: [
      'Mediterranean Chickpea Salad',
      'Mediterranean Chickpea Salad (Copy)',
    ],
  },
  {
    name: 'Fresh blueberries',
    qty: '2 cup',
    days: 7,
    badge: 'x5',
    usedIn: ['Blueberry Pancakes'],
  },
];

/* ---------- Small helpers ---------- */

const KPICard = ({
  icon,
  label,
  value,
  gradient,
}: {
  icon: typeof AttachMoneyRounded;
  label: string;
  value: string | number;
  gradient: string;
}) => (
  <Paper
    sx={{
      p: 2,
      borderRadius: 1,
      background: gradient,
      color: '#fff',
      boxShadow: '0 12px 30px rgba(0,0,0,.18)',
    }}
  >
    <Stack direction="row" spacing={1.5} alignItems="center">
      <SvgIcon component={icon} sx={{ opacity: 0.95 }} />
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

function FieldSelect({
  value,
  onChange,
  options = RECIPES,
}: {
  value: string;
  onChange: (v: string) => void;
  options?: string[];
}) {
  const handle = (e: SelectChangeEvent<string>) =>
    onChange(e.target.value as string);
  return (
    <Select
      size="small"
      value={value}
      onChange={handle}
      fullWidth
      sx={{
        backgroundColor: '#fff',
        '& .MuiSelect-outlined': { py: 1 },
      }}
      MenuProps={{ PaperProps: { sx: { borderRadius: 2 } } }}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </Select>
  );
}

/* ---------- Page ---------- */

export default function MealPlannerSection() {
  const [week, setWeek] = React.useState<DayPlan[]>(initialWeek);

  const setMeal = (dayIdx: number, slot: MealSlot, recipe: string) => {
    setWeek((w) => {
      const next = [...w];
      next[dayIdx] = {
        ...next[dayIdx],
        meals: { ...next[dayIdx].meals, [slot]: recipe },
      };
      return next;
    });
  };

  // derived values (demo only)
  const mealsPlanned = week.reduce(
    (n, d) =>
      n + Object.values(d.meals).filter((m) => m !== 'Skip meal').length,
    0,
  );
  const ingredients = 31;
  const totalCost = 103;

  return (
    <>
      {/* Header */}
      <Typography variant="h4" fontWeight={900} letterSpacing="-0.01em">
        Weekly Meal Planner
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Plan your week and save time & money
      </Typography>

      <Grid size={{ xs: 12, md: 4, lg: 3 }} sx={{ mb: 2 }}>
        <Stack
          direction={{ md: 'row', sm: 'column', xs: 'column' }}
          spacing={1}
          justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
        >
          <Button
            variant="contained"
            startIcon={<SendRounded />}
            sx={{
              bgcolor: '#FFE847',
              color: 'text.primary',
              '&:hover': { bgcolor: '#FDE047' },
            }}
          >
            Send to Shopping List
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveRounded />}
          >
            Save Plan
          </Button>
        </Stack>
      </Grid>

      {/* KPIs + Actions */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <KPICard
                icon={AttachMoneyRounded}
                label="Total Cost"
                value={`$${totalCost.toFixed(2)}`}
                gradient="linear-gradient(90deg,#0BA36B,#0E7C5B)"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <KPICard
                icon={LocalMallRounded}
                label="Ingredients"
                value={ingredients}
                gradient="linear-gradient(90deg,#2563EB,#4F46E5)"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <KPICard
                icon={CalendarMonthRounded}
                label="Meals Planned"
                value={mealsPlanned}
                gradient="linear-gradient(90deg,#C026D3,#EC4899)"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Planner + Shopping List */}
      <Grid container spacing={2.5}>
        {/* Planner */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 2, borderRadius: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2 }}
            >
              <CalendarMonthRounded fontSize="small" />
              <Typography fontWeight={800}>
                Week of {START_WEEK.replace('Week of ', '')}
              </Typography>
            </Stack>
            <Divider sx={{ mb: 1.5 }} />

            {week.map((d, i) => (
              <Box key={i} sx={{ py: 1.5 }}>
                <Typography fontWeight={800} sx={{ mb: 1 }}>
                  {d.dateLabel}
                </Typography>

                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="caption" color="text.secondary">
                      Breakfast
                    </Typography>
                    <FieldSelect
                      value={d.meals.breakfast}
                      onChange={(v) => setMeal(i, 'breakfast', v)}
                      options={[
                        'Skip meal',
                        'Blueberry Pancakes',
                        ...RECIPES.filter((x) => x !== 'Skip meal'),
                      ]}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="caption" color="text.secondary">
                      Lunch
                    </Typography>
                    <FieldSelect
                      value={d.meals.lunch}
                      onChange={(v) => setMeal(i, 'lunch', v)}
                      options={[
                        'Skip meal',
                        'Mediterranean Chickpea Salad',
                        'Mediterranean Chickpea Salad (Copy)',
                        ...RECIPES.filter(
                          (x) =>
                            !x.toLowerCase().includes('salad') &&
                            x !== 'Skip meal',
                        ),
                      ]}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="caption" color="text.secondary">
                      Dinner
                    </Typography>
                    <FieldSelect
                      value={d.meals.dinner}
                      onChange={(v) => setMeal(i, 'dinner', v)}
                    />
                  </Grid>
                </Grid>

                {i < week.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Shopping List */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2, borderRadius: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 1.5 }}
            >
              <ShoppingCartRounded fontSize="small" />
              <Typography fontWeight={800}>Shopping List</Typography>
            </Stack>

            <List disablePadding>
              {SHOPPING.map((it, idx) => (
                <React.Fragment key={it.name}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.25,
                      borderRadius: 1,
                      mb: 1,
                      bgcolor: (t) => alpha(t.palette.primary.light, 0.06),
                      borderColor: (t) => alpha(t.palette.text.primary, 0.08),
                    }}
                  >
                    <ListItem
                      disableGutters
                      disablePadding
                      secondaryAction={
                        <Typography variant="caption" color="text.secondary">
                          {it.days}d
                        </Typography>
                      }
                    >
                      <ListItemText
                        primary={
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Typography fontWeight={800}>{it.name}</Typography>
                            {it.badge && (
                              <Chip
                                size="small"
                                label={it.badge}
                                color="success"
                                variant="filled"
                              />
                            )}
                          </Stack>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography
                              variant="caption"
                              sx={{ display: 'block' }}
                            >
                              <strong>{it.qty}</strong>
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ display: 'block' }}
                            >
                              For: {it.usedIn.join(', ')}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </Paper>
                  {idx === 1 && <Divider sx={{ my: 0.5, opacity: 0.2 }} />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
