import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Box,
  Grid,
  InputBase,
  Paper,
  Stack,
  Typography,
  debounce,
} from '@mui/material';
import * as React from 'react';

import FoodFilter from '@/components/FoodFilter';
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { Recipe } from '@/components/RecipeCard/RecipeCard.model';
import RecipeDialog from '@/components/RecipeDialog/RecipeDialog';
import { RecipeResponse } from '@/interfaces/index';
import { searchRecipesService } from '@/services/index';

const recipesDataNormalized = (data: RecipeResponse): Recipe[] => {
  const dataNormalized: Recipe[] = data.items.map((r, i) => ({
    id: r.id || String(i),
    title: r.title || 'Untitled Recipe',
    desc: r.description || '',
    img: r.image_url || `https://picsum.photos/seed/recipe${i}/800/520`,
    tags: r.tags || [],
    time: r.duration_min ? `${r.duration_min} min` : 'N/A',
    price: r.est_cost_cents
      ? `$ ${(r.est_cost_cents / 100).toFixed(2)}`
      : 'N/A',
    score: r.health_score || 0,
  }));
  return dataNormalized;
};

export default function DashboardSection() {
  const [recipe, setRecipe] = React.useState<Recipe | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleCardClick = (r: Recipe) => {
    setRecipe(r);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  React.useEffect(() => {
    const fetchRecipes = async () => {
      const { data } = await searchRecipesService({ q: searchTerm });
      if (!Array.isArray(data?.items)) return;
      const dataNormalized = recipesDataNormalized(data);
      setRecipes(dataNormalized);
    };
    fetchRecipes();
  }, []);

  const onFilterByLabel = async (label: string) => {
    const { data } = await searchRecipesService({
      q: searchTerm.toLowerCase(),
      tags: [label.toLowerCase()],
    });
    if (!Array.isArray(data?.items)) return;
    const dataNormalized = recipesDataNormalized(data);
    setRecipes(dataNormalized);
  };

  const onSearchChange = React.useCallback(
    debounce(async (value: string) => {
      const { data } = await searchRecipesService({ q: value });
      if (!Array.isArray(data?.items)) return;
      const dataNormalized = recipesDataNormalized(data);
      setRecipes(dataNormalized);
    }, 600),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <>
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
          backgroundColor: 'warning.light', // bright yellow like mock
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1 }}>
          <SearchRoundedIcon />
          <InputBase
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search recipes..."
            sx={{ flex: 1, fontWeight: 600 }}
            inputProps={{ 'aria-label': 'search recipes' }}
          />
        </Stack>
      </Paper>

      <FoodFilter activeFilter="All" handleChip={onFilterByLabel} />

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Showing <strong>{recipes.length}</strong> recipes
      </Typography>

      {/* Grid of cards */}
      <Grid container spacing={2.5}>
        {recipes.map((r) => (
          <Grid key={r.id} item xs={12} sm={6} lg={4}>
            <RecipeCard r={r} handleCardClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>

      <RecipeDialog
        recipeData={recipe}
        open={dialogOpen}
        onClose={handleDialogClose}
      />
    </>
  );
}
