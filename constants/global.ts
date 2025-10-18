import { digitRegEx, specialCharsRegEx } from '../utils';

export const minPasswordLength = 8;
export const maxAge = 120;
export const minAge = 13;

export const foodTypeFilters = [
  { label: 'All Recipes', filled: true, icon: '🍽️' },
  { label: 'Vegan', icon: '🌱' },
  { label: 'Vegetarian', icon: '🥗' },
  { label: 'Meat', icon: '🥩' },
  { label: 'Seafood', icon: '🐟' },
  { label: 'Mexican', icon: '🌮' },
  { label: 'Italian', icon: '🍕' },
  { label: 'Asian', icon: '🍜' },
  { label: 'Mediterranean', icon: '🫒' },
  { label: 'Dessert', icon: '🍰' },
  { label: 'Breakfast', icon: '🥐' },
  { label: 'Quick & Easy', icon: '⚡' },
  { label: 'Low Carb', icon: '🥬' },
  { label: 'Gluten Free', icon: '🚫' },
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
