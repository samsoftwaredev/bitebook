import { FoodTypeFilter } from '../interfaces';
import { digitRegEx, specialCharsRegEx } from '../utils';

export const minPasswordLength = 8;
export const maxAge = 120;
export const minAge = 13;

export const foodTypeFilters: FoodTypeFilter[] = [
  { value: 'all', label: 'All Recipes', filled: true, icon: '🍽️' },
  { value: 'vegan', label: 'Vegan', icon: '🌱' },
  { value: 'vegetarian', label: 'Vegetarian', icon: '🥗' },
  { value: 'meat', label: 'Meat', icon: '🥩' },
  { value: 'seafood', label: 'Seafood', icon: '🐟' },
  { value: 'mexican', label: 'Mexican', icon: '🌮' },
  { value: 'italian', label: 'Italian', icon: '🍕' },
  { value: 'asian', label: 'Asian', icon: '🍜' },
  { value: 'mediterranean', label: 'Mediterranean', icon: '🫒' },
  { value: 'dessert', label: 'Dessert', icon: '🍰' },
  { value: 'breakfast', label: 'Breakfast', icon: '🥐' },
  { value: 'quick_easy', label: 'Quick & Easy', icon: '⚡' },
  { value: 'low_carb', label: 'Low Carb', icon: '🥬' },
  { value: 'gluten_free', label: 'Gluten Free', icon: '🚫' },
  { value: 'lunch', label: 'Lunch', icon: '🍽️' },
  { value: 'dinner', label: 'Dinner', icon: '🍽️' },
  { value: 'snack', label: 'Snack', icon: '🍿' },
];

export const passwordValidationRules = {
  required: true,
  minLength: {
    value: minPasswordLength,
    message: 'Password is too short',
  },
  validate: (value: string) =>
    digitRegEx.test(value) && specialCharsRegEx.test(value),
  maxLength: {
    value: 100,
    message: 'The email exceed max length',
  },
};
