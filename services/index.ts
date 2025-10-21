import { supabase } from '../classes';
import { RecipeDetail, RecipeResponse } from '../interfaces';

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
  data: RecipeResponse | null;
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
  isFavorite,
}: {
  recipeId: string;
  isFavorite: boolean;
}): Promise<{
  data: { success: boolean } | null;
  error: any;
}> => {
  const { data, error } = await supabase.functions.invoke('favorites-toggle', {
    body: { recipeId, isFavorite },
  });
  return { data, error };
};
