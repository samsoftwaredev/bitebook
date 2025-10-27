import { debounce } from '@mui/material';
import type { NextPage } from 'next';
import * as React from 'react';

import { AppWrapper } from '@/components';
import { DashboardSection } from '@/components/Sections';
import { AppLayout } from '@/components/Templates';
import { useLanguageContext } from '@/context/LanguageContext';
import { RecipeResponse, RecipeType } from '@/interfaces';
import { searchRecipesService } from '@/services';

const Favorite: NextPage = () => {
  const { lang } = useLanguageContext();
  const [recipe, setRecipe] = React.useState<RecipeType | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const recipesDataNormalized = (data: RecipeResponse): RecipeType[] => {
    const dataNormalized: RecipeType[] = data.items.map((r, i) => ({
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

  const handleCardClick = (r: RecipeType) => {
    setRecipe(r);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [recipes, setRecipes] = React.useState<RecipeType[]>([]);

  React.useEffect(() => {
    const fetchRecipes = async () => {
      const { data } = await searchRecipesService({
        isFavorite: true,
        q: searchTerm,
      });
      if (!Array.isArray(data?.items)) return;
      const dataNormalized = recipesDataNormalized(data);
      setRecipes(dataNormalized);
    };
    fetchRecipes();
  }, []);

  const onFilterByLabel = async (label: string) => {
    const { data } = await searchRecipesService({
      isFavorite: true,
      q: searchTerm.toLowerCase(),
      tags: [label.toLowerCase()],
    });
    if (!Array.isArray(data?.items)) return;
    const dataNormalized = recipesDataNormalized(data);
    setRecipes(dataNormalized);
  };

  const onSearchChange = React.useCallback(
    debounce(async (value: string) => {
      const { data } = await searchRecipesService({
        isFavorite: true,
        q: value,
      });
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
        title={'My Favorites'}
        subtitle={'Your collection of beloved recipes'}
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

const FavoritePageWrapper = () => {
  return (
    <AppWrapper>
      <Favorite />
    </AppWrapper>
  );
};

export default FavoritePageWrapper;
