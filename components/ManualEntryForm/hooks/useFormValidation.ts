import { useEffect, useMemo, useState } from 'react';

import { RecipeFormData } from '@/interfaces';

interface ValidationRules {
  title: boolean;
  ingredients: boolean;
  steps: boolean;
  cookTime: boolean;
  servings: boolean;
}

export const useFormValidation = (
  formData: RecipeFormData,
  steps: string[],
) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validationRules = useMemo<ValidationRules>(
    () => ({
      title: !!(formData.title && formData.title.trim()),
      ingredients: (formData.ingredients?.length || 0) > 0,
      steps: steps.filter((step) => step.trim()).length > 0,
      cookTime:
        !formData.cookTime ||
        (!isNaN(Number(formData.cookTime)) && Number(formData.cookTime) > 0),
      servings:
        !formData.servings ||
        (!isNaN(Number(formData.servings)) && Number(formData.servings) > 0),
    }),
    [formData, steps],
  );

  useEffect(() => {
    const errors: string[] = [];

    if (!validationRules.title) {
      errors.push('Recipe title is required');
    }
    if (!validationRules.ingredients) {
      errors.push('Please add at least one ingredient');
    }
    if (!validationRules.steps) {
      errors.push('Please add at least one instruction step');
    }
    if (!validationRules.cookTime) {
      errors.push('Cook time must be a positive number');
    }
    if (!validationRules.servings) {
      errors.push('Servings must be a positive number');
    }

    setValidationErrors(errors);
  }, [validationRules]);

  const calculateProgress = useMemo(() => {
    const totalFields = 4; // title, ingredients, steps, basic info
    let completed = 0;

    if (validationRules.title) completed++;
    if (validationRules.ingredients) completed++;
    if (validationRules.steps) completed++;
    if (formData.cookTime && formData.servings) completed++;

    return (completed / totalFields) * 100;
  }, [validationRules, formData.cookTime, formData.servings]);

  const isFormValid = useMemo(
    () =>
      validationErrors.length === 0 && formData.title && formData.title.trim(),
    [validationErrors, formData.title],
  );

  return {
    validationErrors,
    calculateProgress,
    isFormValid,
  };
};
