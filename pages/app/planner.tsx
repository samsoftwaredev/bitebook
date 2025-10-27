import { debounce } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AppWrapper from '@/components/AppWrapper';
import { Recipe } from '@/components/RecipeCard/RecipeCard.model';
import MealPlannerEditorSection from '@/components/Sections/MealPlannerEditorSection';
import MealPlannerSection from '@/components/Sections/MealPlannerSection';
import { AppLayout } from '@/components/Templates';
import { NAV_APP_LINKS } from '@/constants/nav';
import { useLanguageContext } from '@/context/LanguageContext';
import { DayPlan, RecipeResponse } from '@/interfaces';
import {
  createOrUpdateMealPlanService,
  generateShoppingListService,
  searchRecipesService,
} from '@/services';

const weekTemplate: DayPlan[] = Array.from({ length: 7 }, (_, i) => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1); // Get Monday
  const day = new Date(monday);
  day.setDate(monday.getDate() + i);

  const dayName = day
    .toLocaleDateString('en-US', { weekday: 'short' })
    .slice(0, 3);
  const date = day.getDate();

  return {
    key: `${dayName} ${date}`,
    date: day.toISOString().split('T')[0],
    slots: { breakfast: null, lunch: null, dinner: null },
    isToday: day.toDateString() === today.toDateString(),
  };
});

const Planner: NextPage = () => {
  const isEditMode = true; // You can replace this with actual logic to determine the mode

  const { lang } = useLanguageContext();
  const router = useRouter();

  // planner state
  const [days, setDays] = useState<DayPlan[]>(weekTemplate);
  const [mealPlanId, setMealPlanId] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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

  const createWeeklyMealPlanner = async () => {
    try {
      const res = await createOrUpdateMealPlanService({
        weekStart: weekTemplate[0].date,
      });
      setMealPlanId(res.data?.mealPlan.id || null);
      const transformedPlannedMeals: DayPlan[] = weekTemplate.map((day) => {
        const dayMeals = res.data?.plannedMeals.filter(
          (meal) => meal.meal_date === day.date,
        );
        return {
          ...day,
          slots: {
            breakfast:
              dayMeals?.find((meal) => meal.meal_slot === 'breakfast')
                ?.recipe_id || null,
            lunch:
              dayMeals?.find((meal) => meal.meal_slot === 'lunch')?.recipe_id ||
              null,
            dinner:
              dayMeals?.find((meal) => meal.meal_slot === 'dinner')
                ?.recipe_id || null,
          },
        };
      });
      setDays(transformedPlannedMeals);
    } catch (error) {
      console.error('Error creating weekly meal planner:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
    createWeeklyMealPlanner();
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

  const handleSendToShoppingList = async (completed = () => {}) => {
    if (!mealPlanId) return;
    try {
      const { data, error } = await generateShoppingListService({
        mealPlanId,
        regenerate: false,
      });
      if (error) {
        console.error('Error generating shopping list:', error);
        toast.error('Error generating shopping list');
        return;
      }
      toast.success('Shopping list generated successfully', {
        autoClose: 1000,
        onClose: () => {
          router.push(
            `${NAV_APP_LINKS.shoppingList.link}?shoppingListId=${data?.shoppingListId}`,
          );
        },
      });
    } catch (error) {
      console.error('Error generating shopping list:', error);
      toast.error('Error generating shopping list');
    } finally {
      completed();
    }
  };

  return (
    <AppLayout>
      {isEditMode ? (
        <MealPlannerEditorSection
          mealPlanId={mealPlanId}
          searchTerm={searchTerm}
          recipes={recipes}
          handleCardClick={handleCardClick}
          dialogOpen={dialogOpen}
          recipe={recipe}
          handleDialogClose={handleDialogClose}
          handleSearchChange={handleSearchChange}
          onFilterByLabel={onFilterByLabel}
          setDays={setDays}
          handleSendToShoppingList={handleSendToShoppingList}
          days={days}
        />
      ) : (
        <MealPlannerSection />
      )}
    </AppLayout>
  );
};

const PlannerPageWrapper = () => {
  return (
    <AppWrapper>
      <Planner />
    </AppWrapper>
  );
};

export default PlannerPageWrapper;
