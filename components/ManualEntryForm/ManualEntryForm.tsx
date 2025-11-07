import { Box, Grid } from '@mui/material';

// Interfaces
import { RecipeFormData } from '@/interfaces';

import {
  CoreDetailsSection,
  FormFooter,
  FormHeader,
  IngredientsSection,
  InstructionsSection,
  PhotoUploadSection,
  SuccessSnackbar,
} from './components';
// Hooks
import { useFormState } from './hooks/useFormState';
import { useFormValidation } from './hooks/useFormValidation';
import { useIngredientForm } from './hooks/useIngredientForm';
import { useUnits } from './hooks/useUnits';

interface ManualEntryFormProps {
  initialData?: Partial<RecipeFormData>;
  onBack?: () => void;
  trigger?: boolean;
}

const ManualEntryForm = ({
  initialData,
  onBack = () => {},
  trigger = false,
}: ManualEntryFormProps) => {
  // Custom hooks
  const {
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
  } = useFormState(initialData);

  const {
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
  } = useIngredientForm(formData.ingredients || [], (ingredients) =>
    handleInputChange('ingredients', ingredients),
  );

  const { validationErrors, calculateProgress, isFormValid } =
    useFormValidation(formData, steps);
  const { units } = useUnits();

  return (
    <Box>
      <FormHeader
        currentStep={1}
        validationErrors={validationErrors}
        calculateProgress={calculateProgress}
        isFormValid={!!isFormValid}
        isLoading={isLoading}
        formTitle={formData.title || ''}
        onSave={handleSave}
      />

      <PhotoUploadSection
        photoPreview={photoPreview}
        onPhotoSelect={handlePhotoSelect}
        selectedPhoto={selectedPhoto}
      />

      <Box sx={{ px: { xs: 2, sm: 3 }, mb: 10 }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CoreDetailsSection
              formData={formData}
              showAdvanced={showAdvanced}
              onToggleAdvanced={handleToggleAdvanced}
              onInputChange={handleInputChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="div"
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              <IngredientsSection
                ingredients={formData.ingredients || []}
                ingredientInput={ingredientInput}
                ingredientQty={ingredientQty}
                ingredientUnit={ingredientUnit}
                units={units}
                editingIngredient={editingIngredient}
                onIngredientInputChange={setIngredientInput}
                onIngredientQtyChange={setIngredientQty}
                onIngredientUnitChange={setIngredientUnit}
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
                onEditIngredient={handleEditIngredient}
              />

              <InstructionsSection
                steps={steps}
                onStepUpdate={handleStepUpdate}
                onStepDelete={handleStepDelete}
                onAddStep={handleAddStep}
                onDragEnd={handleDragEnd}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <FormFooter
        isFormValid={!!isFormValid}
        isLoading={isLoading}
        trigger={trigger}
        onBack={onBack}
        onSave={handleSave}
      />

      <SuccessSnackbar
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </Box>
  );
};

export default ManualEntryForm;
