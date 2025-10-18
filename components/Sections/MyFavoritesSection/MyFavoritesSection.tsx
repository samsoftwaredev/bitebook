import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Box,
  Grid,
  InputBase,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import * as React from 'react';

import FoodFilter from '@/components/FoodFilter/FoodFilter';
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { Recipe } from '@/components/RecipeCard/RecipeCard.model';

export default function MyFavoritesSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // --- sample data (replace with real favorites) ---
  const recipes: Recipe[] = React.useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
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
        time: ['35 min', '15 min', '25 min', '40 min', '20 min', '30 min'][
          i % 6
        ],
        price: ['$ 11.00', '$ 8.50', '$ 9.00', '$ 12.50', '$ 6.80', '$ 10.25'][
          i % 6
        ],
        score: [92, 95, 35, 78, 42, 68][i % 6],
      })),
    [],
  );

  // --- search + filters ---
  const [query, setQuery] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState<string>('All');

  const handleChip = (label: string) => {
    setActiveFilter((prev) => (prev === label ? 'All' : label));
  };

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((r) => {
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.desc.toLowerCase().includes(q) ||
        r.tags.join(' ').toLowerCase().includes(q);

      const matchesFilter =
        activeFilter === 'All' ||
        r.tags.map((t) => t.toLowerCase()).includes(activeFilter.toLowerCase());

      return matchesQuery && matchesFilter;
    });
  }, [recipes, query, activeFilter]);

  return (
    <>
      {/* Title & subtitle */}
      <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FavoriteRoundedIcon fontSize="medium" sx={{ color: '#EF4444' }} />
          <Typography
            id="favorites-title"
            variant={isMobile ? 'h5' : 'h4'}
            fontWeight={800}
            letterSpacing="-0.01em"
          >
            My Favorites
          </Typography>
        </Stack>
        <Typography color="text.secondary">
          Your collection of beloved recipes
        </Typography>
      </Box>

      {/* Search bar (mobile-first) */}
      <Paper
        aria-label="Search favorites"
        sx={{
          p: 0.75,
          borderRadius: 2,
          mb: { xs: 1.5, sm: 2 },
          backgroundColor: 'warning.light',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.25}
          sx={{ px: 1 }}
        >
          <SearchRoundedIcon />
          <InputBase
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes, tags, or descriptions…"
            sx={{ flex: 1, fontWeight: 600, minHeight: 36 }}
            inputProps={{ 'aria-label': 'Search recipes' }}
          />
        </Stack>
      </Paper>

      <FoodFilter activeFilter={activeFilter} handleChip={handleChip} />

      {/* Count */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: { xs: 1, sm: 1.5 } }}
      >
        Showing <strong>{filtered.length}</strong> of{' '}
        <strong>{recipes.length}</strong> recipes
      </Typography>

      {/* Grid of cards — mobile-first breakpoints */}
      <Grid container spacing={{ xs: 1.75, sm: 2.5 }}>
        {filtered.map((r) => (
          <Grid key={r.id} item xs={12} sm={6} md={4} xl={3}>
            <RecipeCard r={r} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
