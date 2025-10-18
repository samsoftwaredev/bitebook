import { supabase } from '../classes';
import { RecipeResponse } from '../interfaces';

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
  data: RecipeResponse | null;
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
  q,
  tags,
  limit = 30,
  offset = 0,
}: {
  q?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}): Promise<{
  data: RecipeResponse | null;
  error: any;
}> => {
  if (tags?.includes('All Recipes')) {
    tags.splice(tags.indexOf('All Recipes'), 1);
  }

  const { data, error } = await supabase.functions.invoke('recipes-search', {
    body: { q, tags, limit, offset },
  });
  return { data, error };
};
