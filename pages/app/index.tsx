import { debounce } from '@mui/material';
import type { NextPage } from 'next';
import * as React from 'react';

import AppWrapper from '@/components/AppWrapper';
import { Recipe } from '@/components/RecipeCard/RecipeCard.model';
import { DashboardSection } from '@/components/Sections';
import { AppLayout } from '@/components/Templates';
import { useLanguageContext } from '@/context/LanguageContext';
import { RecipeResponse } from '@/interfaces/index';
import { searchRecipesService } from '@/services/index';

const App: NextPage = () => {
  const { lang } = useLanguageContext();
  const [recipe, setRecipe] = React.useState<Recipe | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

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

  const handleCardClick = (r: Recipe) => {
    setRecipe(r);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const fetchRecipes = async () => {
    const { data } = await searchRecipesService({ q: searchTerm });
    if (!Array.isArray(data?.items)) return;
    const dataNormalized = recipesDataNormalized(data);
    setRecipes(dataNormalized);
  };

  React.useEffect(() => {
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
    <AppLayout>
      <DashboardSection
        title={'Discover Recipes'}
        subtitle={'Find your next favorite dish'}
        searchTerm={searchTerm}
        recipes={recipes}
        handleCardClick={handleCardClick}
        dialogOpen={dialogOpen}
        recipe={recipe}
        handleDialogClose={handleDialogClose}
        handleSearchChange={handleSearchChange}
        onFilterByLabel={onFilterByLabel}
      />
    </AppLayout>
  );
};

const AppPageWrapper = () => {
  return (
    <AppWrapper>
      <App />
    </AppWrapper>
  );
};

export default AppPageWrapper;
