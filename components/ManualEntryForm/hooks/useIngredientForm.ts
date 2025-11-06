import { useCallback, useState } from 'react';

import { IngredientFormData } from '@/interfaces';

export const useIngredientForm = (
  ingredients: IngredientFormData[],
  onIngredientsChange: (ingredients: IngredientFormData[]) => void,
) => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredientQty, setIngredientQty] = useState('');
  const [ingredientUnit, setIngredientUnit] = useState('cup');
  const [editingIngredient, setEditingIngredient] = useState<number | null>(
    null,
  );

  const handleAddIngredient = useCallback(() => {
    if (!ingredientInput.trim()) return;

    const newIngredient: IngredientFormData = {
      ingredient_id: crypto.randomUUID(),
      name: ingredientInput.trim(),
      qty_num: parseFloat(ingredientQty) || undefined,
      qty_unit: ingredientUnit || undefined,
      shelf_life_days: undefined,
    };

    if (editingIngredient !== null) {
      // Update existing ingredient
      const updatedIngredients = [...ingredients];
      updatedIngredients[editingIngredient] = newIngredient;
      onIngredientsChange(updatedIngredients);
      setEditingIngredient(null);
    } else {
      // Add new ingredient
      onIngredientsChange([...ingredients, newIngredient]);
    }

    // Reset form
    setIngredientInput('');
    setIngredientQty('');
    setIngredientUnit('cup');
  }, [
    ingredientInput,
    ingredientQty,
    ingredientUnit,
    editingIngredient,
    ingredients,
    onIngredientsChange,
  ]);

  const handleRemoveIngredient = useCallback(
    (index: number) => {
      const updatedIngredients = ingredients.filter((_, i) => i !== index);
      onIngredientsChange(updatedIngredients);
    },
    [ingredients, onIngredientsChange],
  );

  const handleEditIngredient = useCallback(
    (index: number) => {
      const ingredient = ingredients[index];
      setIngredientInput(ingredient.name);
      setIngredientQty(ingredient.qty_num?.toString() || '');
      setIngredientUnit(ingredient.qty_unit || 'cup');
      setEditingIngredient(index);
    },
    [ingredients],
  );

  return {
    ingredientInput,
    ingredientQty,
    ingredientUnit,
    editingIngredient,
    setIngredientInput,
    setIngredientQty,
    setIngredientUnit,
    handleAddIngredient,
    handleRemoveIngredient,
    handleEditIngredient,
  };
};
