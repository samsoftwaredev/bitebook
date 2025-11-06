import { DragEndEvent } from '@dnd-kit/core';
import { useCallback, useEffect, useState } from 'react';

import { RecipeFormData } from '@/interfaces';
import { addRecipeService } from '@/services';

export const useFormState = (initialData?: Partial<RecipeFormData>) => {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    ingredients: initialData?.ingredients || [],
    steps: initialData?.steps || [],
    cookTime: initialData?.cookTime || '',
    servings: initialData?.servings || '',
    difficulty: initialData?.difficulty || '',
    cuisine: initialData?.cuisine || '',
  });

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [steps, setSteps] = useState<string[]>(
    formData.steps && formData.steps.length > 0 ? formData.steps : [''],
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form handlers
  const handleInputChange = useCallback(
    (field: keyof RecipeFormData, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handlePhotoSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedPhoto(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotoPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  // Step management
  const handleAddStep = useCallback(() => {
    setSteps((prev) => [...prev, '']);
  }, []);

  const handleStepUpdate = useCallback((index: number, value: string) => {
    setSteps((prev) => {
      const newSteps = [...prev];
      newSteps[index] = value;
      return newSteps;
    });
  }, []);

  const handleStepDelete = useCallback((index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = parseInt(active.id.toString().split('-')[1]);
      const newIndex = parseInt(over.id.toString().split('-')[1]);

      setSteps((items) => {
        const newItems = [...items];
        const [reorderedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, reorderedItem);
        return newItems;
      });
    }
  }, []);

  // Advanced options toggle
  const handleToggleAdvanced = useCallback(() => {
    setShowAdvanced((prev) => !prev);
  }, []);

  // Save handler
  const handleSave = useCallback(async () => {
    setIsLoading(true);

    try {
      const recipeData = {
        title: formData.title || '',
        description: formData.description,
        steps: steps
          .filter((step) => step.trim())
          .map((body, index) => ({
            step_no: index + 1,
            body,
          })),
        ingredients:
          formData.ingredients?.map((ing) => ({
            ingredient_id: ing.ingredient_id || crypto.randomUUID(),
            name: ing.name,
            qty_num: ing.qty_num || 1,
            qty_unit: ing.qty_unit || 'piece',
            shelf_life_days: ing.shelf_life_days || null,
          })) || [],
        duration_min: parseInt(formData.cookTime || '0') || undefined,
        servings: parseInt(formData.servings || '0') || undefined,
      };

      await addRecipeService(recipeData);
      setShowSuccess(true);

      // Reset form after successful save
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          ingredients: [],
          steps: [],
          cookTime: '',
          servings: '',
          difficulty: '',
          cuisine: '',
        });
        setSteps(['']);
        setSelectedPhoto(null);
        setPhotoPreview('');
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving recipe:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  }, [formData, steps, selectedPhoto]);

  // Update formData when steps change
  useEffect(() => {
    const validSteps = steps.filter((step) => step.trim());
    handleInputChange('steps', validSteps);
  }, [steps, handleInputChange]);

  return {
    formData,
    selectedPhoto,
    photoPreview,
    steps,
    showAdvanced,
    showSuccess,
    isLoading,
    handleInputChange,
    handlePhotoSelect,
    handleAddStep,
    handleStepUpdate,
    handleStepDelete,
    handleToggleAdvanced,
    handleDragEnd,
    handleSave,
    setShowSuccess,
  };
};
