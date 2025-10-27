import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Button,
  Grid,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import * as React from 'react';

import {
  AddNewRecipeDialog,
  FoodFilter,
  PageHeader,
  RecipeCard,
  RecipeDialog,
} from '@/components';
import { Recipe } from '@/components/RecipeCard/RecipeCard.model';

interface Props {
  searchTerm: string;
  recipes: Recipe[];
  handleCardClick: (r: Recipe) => void;
  dialogOpen: boolean;
  recipe: Recipe | null;
  handleDialogClose: () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterByLabel: (label: string) => void;
  title: string;
  subtitle: string;
}

export default function DashboardSection({
  searchTerm,
  recipes,
  handleCardClick,
  dialogOpen,
  recipe,
  handleDialogClose,
  handleSearchChange,
  onFilterByLabel,
  title,
  subtitle,
}: Props) {
  const [addNewRecipeDialogOpen, setAddNewRecipeDialogOpen] =
    React.useState(false);

  const onAddNewRecipe = () => {
    setAddNewRecipeDialogOpen(true);
  };

  const handleAddNewRecipeDialogClose = () => {
    setAddNewRecipeDialogOpen(false);
  };

  return (
    <>
      {/* Title & subtitle */}
      <PageHeader title={title} subTitle={subtitle}>
        <Button
          variant="contained"
          onClick={onAddNewRecipe}
          startIcon={<AddRoundedIcon />}
        >
          Add New Recipe
        </Button>
      </PageHeader>

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

      <AddNewRecipeDialog
        open={addNewRecipeDialogOpen}
        onClose={handleAddNewRecipeDialogClose}
      />

      <RecipeDialog
        recipeData={recipe}
        open={dialogOpen}
        onClose={handleDialogClose}
      />
    </>
  );
}
