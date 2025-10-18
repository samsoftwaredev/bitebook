import BrunchDiningRoundedIcon from '@mui/icons-material/BrunchDiningRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import EggAltRoundedIcon from '@mui/icons-material/EggAltRounded';
import GrassRoundedIcon from '@mui/icons-material/GrassRounded';
import KebabDiningRoundedIcon from '@mui/icons-material/KebabDiningRounded';
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import LocalPizzaRoundedIcon from '@mui/icons-material/LocalPizzaRounded';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import NoMealsRoundedIcon from '@mui/icons-material/NoMealsRounded';
import RamenDiningRoundedIcon from '@mui/icons-material/RamenDiningRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SetMealRoundedIcon from '@mui/icons-material/SetMealRounded';
import TapasRoundedIcon from '@mui/icons-material/TapasRounded';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import {
  Box,
  Chip,
  Container,
  Grid,
  InputBase,
  Paper,
  Stack,
  Theme,
  Typography,
  alpha,
  useMediaQuery,
} from '@mui/material';
import * as React from 'react';

import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { Recipe } from '@/components/RecipeCard/RecipeCard.model';
import { foodTypeFilters } from '@/constants/global';

export default function DashboardSection() {
  const isMdUp = useMediaQuery((t: Theme) => t.breakpoints.up('md'));

  // sample data
  const recipes: Recipe[] = Array.from({ length: 9 }).map((_, i) => ({
    id: String(i),
    title:
      [
        'Quinoa Buddha Bowl',
        'Mediterranean Chickpea Salad',
        'Chocolate Lava Cake',
        'Spicy Korean Beef Bowl',
        'Tiramisu',
        'Creamy Mushroom Risotto',
      ][i % 6] + (i < 2 ? ' (Copy)' : ''),
    desc: [
      'Nutritious bowl packed with quinoa, roasted vegetables, and tahini dressing',
      'Fresh salad with protein and Mediterranean flavors',
      'Decadent chocolate dessert with a molten center',
      'Sweet and spicy ground beef served over rice with fresh veggies',
      'Classic Italian coffee-flavored dessert with mascarpone',
      'Rich and creamy Italian rice dish with wild mushrooms',
    ][i % 6],
    img: `https://picsum.photos/seed/recipe${i}/800/520`,
    tags: [
      ['vegan', 'lunch', 'dinner'],
      ['vegan', 'mediterranean', 'lunch'],
      ['vegetarian', 'dessert'],
      ['dinner'],
      ['dessert', 'italian'],
      ['vegetarian', 'italian'],
    ][i % 6],
    time: ['35 min', '15 min', '25 min', '40 min', '20 min', '30 min'][i % 6],
    price: ['$ 11.00', '$ 8.50', '$ 9.00', '$ 12.50', '$ 6.80', '$ 10.25'][
      i % 6
    ],
    score: [92, 95, 35, 78, 42, 68][i % 6],
  }));

  return (
    <Container maxWidth="xl" disableGutters>
      {/* Title & subtitle */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight={800} letterSpacing="-0.01em">
          Discover Recipes
        </Typography>
        <Typography color="text.secondary">
          Find your next favorite dish
        </Typography>
      </Box>

      {/* Search bar */}
      <Paper
        sx={{
          p: 0.75,
          borderRadius: 2,
          mb: 2,
          backgroundColor: '#FFE847', // bright yellow like mock
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1 }}>
          <SearchRoundedIcon />
          <InputBase
            placeholder="Search recipes..."
            sx={{ flex: 1, fontWeight: 600 }}
            inputProps={{ 'aria-label': 'search recipes' }}
          />
        </Stack>
      </Paper>

      {/* Filters – scrollable on mobile */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mb: 2.5,
          overflowX: 'auto',
          py: 0.5,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {foodTypeFilters.map((f) => (
          <Chip
            key={f.label}
            label={f.label}
            color={f.filled ? 'success' : 'default'}
            variant={f.filled ? 'filled' : 'outlined'}
            icon={<span>{f.icon}</span>}
            sx={{
              borderRadius: 999,
              fontWeight: f.filled ? 700 : 600,
              backgroundColor: f.filled ? alpha('#0FB77A', 0.2) : undefined,
            }}
            clickable
          />
        ))}
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Showing <strong>{recipes.length}</strong> recipes
      </Typography>

      {/* Grid of cards */}
      <Grid container spacing={2.5}>
        {recipes.map((r) => (
          <Grid key={r.id} item xs={12} sm={6} lg={4}>
            <RecipeCard r={r} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
