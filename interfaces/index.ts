export type RecipeService = {
  duration_min: number;
  est_cost_cents: number;
  health_score: number;
  id: string;
  description: string;
  image_url: string;
  servings: number;
  tags: string[];
  title: string;
};

export type RecipeDetail = {
  recipe: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    duration_min: number;
    servings: number;
    est_cost_cents: number;
    shelf_life_days: number | null;
    health_score: number | null;
    is_public: boolean;
    owner_id: string;
  };
  ingredients: {
    ingredient_id: string;
    name: string;
    qty_num: number;
    qty_unit: string;
    shelf_life_days: number | null;
  }[];
  steps: { step_no: number; body: string }[];
  tags: string[];
};

export type RecipeResponse = {
  items: RecipeService[];
  nextCursor: string | null;
};

export type PostgrestError = {
  message: string;
  details: string;
  hint: string;
  code: string;
};

export type FoodTypeFilter = {
  value: string;
  label: string;
  icon: string;
  filled?: boolean;
};

export type MenuItem = {
  value: string;
  label: string;
};

export enum LANG {
  es = 'es',
  en = 'en',
}

export interface User {
  userId: string;
  email?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  genderMale?: boolean;
  dateOfBirth?: string;
  pictureUrl?: string;
  isConfirmed?: boolean;
  updateAt?: string;
  emailVerified?: boolean;
}

export type ResourceSection = {
  body: string;
  title: string;
  image: string;
  imgAlt: string;
  references: { url: string; resource: string }[];
};

export type ResourceContent = {
  image: string;
  description: string;
  title: string;
  imgAlt: string;
  sections: ResourceSection[];
};

export interface ResourcePost {
  author: string | null;
  content: ResourceContent;
  createdAt: string;
  id: string;
  keywords: string | null;
  publishedAt: string | null;
  slug: string;
  updatedAt: string | null;
}

export type Slot = 'breakfast' | 'lunch' | 'dinner';

export type DayPlan = {
  date: string; // e.g., "2025-06-17"
  key: string; // e.g., "Mon 20"
  slots: Record<Slot, string | null>; // recipe id or null
  isToday: boolean;
};
