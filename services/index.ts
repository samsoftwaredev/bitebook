import { supabase } from '@/classes';
import {
  AddRecipeService,
  RecipeDetail,
  RecipeResponse,
  ShoppingItem,
  ShoppingStats,
} from '@/interfaces';

export const healthCheckService = async (): Promise<{
  data: any;
  error: any;
}> => {
  const { data, error } = await supabase.functions.invoke('health', {});
  return { data, error };
};

export const getRecipeByIdService = async (
  id: string,
): Promise<{
  data: RecipeDetail | null;
  error: any;
}> => {
  const { data, error } = await supabase.functions.invoke('recipes-id', {
    body: { id },
  });
  return { data, error };
};

export const mealTypesService = async (): Promise<{
  data: { meal_type: string[] } | null;
  error: any;
}> => {
  const { data, error } = await supabase.functions.invoke('enums-meal-type', {
    method: 'GET',
  });
  return { data, error };
};

export const searchRecipesService = async ({
  tags,
  q = undefined,
  limit = undefined,
  offset = undefined,
  isFavorite = false,
}: {
  q?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
  isFavorite?: boolean;
}): Promise<{
  data: RecipeResponse;
  error: any;
}> => {
  if (tags?.includes('all')) {
    tags.splice(tags.indexOf('all'), 1);
  }

  if (q === '') {
    q = undefined;
  }

  const serviceName = isFavorite ? 'favorites-list' : 'recipes-search';

  const { data, error } = await supabase.functions.invoke(serviceName, {
    body: { q, tags, limit, offset },
  });
  return { data, error };
};

export const favoritesToggleService = async ({
  recipeId,
  favorite,
}: {
  recipeId: string;
  favorite: boolean;
}): Promise<{
  data: { success: boolean } | null;
  error: any;
}> => {
  const { data, error } = await supabase.functions.invoke('favorites-toggle', {
    body: { recipeId, favorite },
  });
  return { data, error };
};

export const getMealPlanSummaryService = async (
  mealPlanId: string, // uuid
): Promise<{
  data: {
    total_cost: number;
    ingredient_count: number;
    meals_planned: number;
  } | null;
  error: any;
}> => {
  const { data, error } = await supabase.functions.invoke(
    'meal-plans-summary',
    {
      body: { mealPlanId },
    },
  );
  return { data, error };
};

export const createOrUpdateMealPlanService = async ({
  weekStart, // "YYYY-MM-DD",
}: {
  weekStart: string;
}): Promise<{
  data: {
    mealPlan: {
      id: string;
      user_id: string;
      week_start: string;
      title: null;
      created_at: string;
    };
    plannedMeals: {
      id: string;
      meal_plan_id: string;
      meal_date: string;
      meal_slot: string;
      recipe_id: string | null;
      notes: null;
    }[];
  } | null;
  error: any;
}> => {
  const { data, error } = await supabase.functions.invoke(
    'meal-plans-get-or-create',
    {
      body: { weekStart },
    },
  );
  return { data, error };
};

export const updateMealPlanSlotService = async ({
  mealPlanId, // uuid
  date, // "YYYY-MM-DD",
  slot, // "breakfast" | "lunch" | "dinner" | "snack"
  recipeId, // uuid
}: {
  mealPlanId: string;
  date: string;
  slot: string;
  recipeId: string | null;
}): Promise<{
  data: any;
  error: any;
}> => {
  const { data, error } = await supabase.functions.invoke(
    'meal-plans-update-slot',
    {
      body: { mealPlanId, date, slot, recipeId },
    },
  );
  return { data, error };
};

export const generateShoppingListService = async ({
  mealPlanId, // uuid
  regenerate = false,
}: {
  mealPlanId: string;
  regenerate?: boolean;
}): Promise<{
  data: {
    shoppingListId: string;
    itemsCreated: number;
  } | null;
  error: any;
}> => {
  const { data, error } = await supabase.functions.invoke(
    'shopping-lists-generate',
    {
      body: { mealPlanId, regenerate },
    },
  );
  return { data, error };
};

export const getShoppingListByUserIdService = async ({
  id,
}: {
  id: string;
}): Promise<{
  data: {
    toBuy: ShoppingItem[];
    purchased: ShoppingItem[];
    stats: ShoppingStats;
  } | null;
  error: any;
}> => {
  const { data, error } = await supabase.functions.invoke('shopping-lists-id', {
    body: { id },
  });
  return { data, error };
};

export const clearShoppingListService = async (
  shoppingListId: string, // uuid
): Promise<{
  data: { success: boolean } | null;
  error: any;
}> => {
  const { data, error } = await supabase.functions.invoke(
    'shopping-lists-clear-completed',
    {
      body: { shoppingListId },
    },
  );
  return { data, error };
};

export const toggleShoppingListItemService = async ({
  shoppingListItemId, // uuid
  boughtAt,
}: {
  shoppingListItemId: string;
  boughtAt?: string;
}): Promise<{
  data: { success: boolean } | null;
  error: any;
}> => {
  const { data, error } = await supabase.functions.invoke(
    'shopping-lists-check-item',
    {
      body: { shoppingListItemId, boughtAt },
    },
  );
  return { data, error };
};

export const addRecipeService = async (
  data: AddRecipeService,
): Promise<{
  data: any;
  error: string;
}> => {
  const { data: responseData, error } = await supabase.functions.invoke(
    'recipes-create',
    {
      body: data,
    },
  );
  return { data: responseData, error };
};

export const updateRecipeService = async (
  data: AddRecipeService,
): Promise<{
  data: any;
  error: any;
}> => {
  const { data: responseData, error } = await supabase.functions.invoke(
    'recipes-update',
    {
      body: data,
    },
  );
  return { data: responseData, error };
};

export const getUnitsService = async (): Promise<{
  data: { unit: string[] } | null;
  error: any;
}> => {
  const { data, error } = await supabase.functions.invoke('get-units', {
    method: 'GET',
  });
  return { data, error };
};
