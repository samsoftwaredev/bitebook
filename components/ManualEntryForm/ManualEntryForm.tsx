import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  Collapse,
  Fab,
  Grid,
  InputAdornment,
  LinearProgress,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { genericFoodImage } from '@/constants/global';
import { IngredientFormData, RecipeFormData } from '@/interfaces/index';
import { addRecipeService, getUnitsService } from '@/services/index';
import { uuidv4 } from '@/utils/helpers';

import SortableStep from '../SortableStep';

interface ManualEntryFormProps {
  onBack: () => void;
  initialData?: RecipeFormData;
}

function ManualEntryForm({ onBack, initialData }: ManualEntryFormProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    ingredients: initialData?.ingredients || ([] as IngredientFormData[]),
    cookTime: initialData?.cookTime || '',
    servings: initialData?.servings || '',
    difficulty: initialData?.difficulty || '',
    cuisine: initialData?.cuisine || '',
    dietaryRestrictions: initialData?.dietaryRestrictions || ([] as string[]),
  });

  const [steps, setSteps] = useState<string[]>(
    initialData?.steps && initialData.steps.length > 0
      ? initialData.steps
      : [''],
  );
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initialData?.imageUrl || null,
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredientQty, setIngredientQty] = useState('');
  const [ingredientUnit, setIngredientUnit] = useState('cup');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [units, setUnits] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Real-time validation
  useEffect(() => {
    const errors: string[] = [];

    if (!formData.title.trim()) {
      errors.push('Recipe title is required');
    }

    if (formData.ingredients.length === 0) {
      errors.push('Please add at least one ingredient');
    }

    if (steps.filter((step) => step.trim()).length === 0) {
      errors.push('Please add at least one instruction step');
    }

    if (
      formData.cookTime &&
      (isNaN(Number(formData.cookTime)) || Number(formData.cookTime) <= 0)
    ) {
      errors.push('Cook time must be a positive number');
    }

    if (
      formData.servings &&
      (isNaN(Number(formData.servings)) || Number(formData.servings) <= 0)
    ) {
      errors.push('Servings must be a positive number');
    }

    setValidationErrors(errors);
  }, [formData, steps]);

  // Progress calculation
  const calculateProgress = () => {
    const totalFields = 4; // title, ingredients, steps, basic info
    let completed = 0;

    if (formData.title.trim()) completed++;
    if (formData.ingredients.length > 0) completed++;
    if (steps.filter((step) => step.trim()).length > 0) completed++;
    if (formData.cookTime && formData.servings) completed++;

    return (completed / totalFields) * 100;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      const newIngredient: IngredientFormData = {
        ingredient_id: uuidv4(),
        name: ingredientInput.trim(),
        qty_num: ingredientQty ? Number(ingredientQty) : 1,
        qty_unit: ingredientUnit,
        shelf_life_days: undefined,
      };

      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient],
      }));

      // Reset input fields
      setIngredientInput('');
      setIngredientQty('');
      setIngredientUnit('cup');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleStepUpdate = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const getUnits = async () => {
    try {
      const { data, error } = await getUnitsService();
      if (error) {
        console.error('Error fetching units:', error);
        return [];
      }
      setUnits(data?.unit || []);
    } catch (error) {
      console.error('Error fetching units:', error);
      return [];
    }
  };

  const handleStepDelete = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = steps.findIndex((_, i) => `step-${i}` === active.id);
      const newIndex = steps.findIndex((_, i) => `step-${i}` === over.id);

      setSteps(arrayMove(steps, oldIndex, newIndex));
    }
  };

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (validationErrors.length > 0) return;

    setIsLoading(true);

    try {
      const { error } = await addRecipeService({
        title: formData.title,
        description: formData.description,
        image_url: photoPreview ?? genericFoodImage,
        duration_min: Number(formData.cookTime),
        servings: Number(formData.servings),
        est_cost_cents: 0,
        shelf_life_days: null,
        health_score: null,
        is_public: false,
        ingredients: formData.ingredients.map((ing) => ({
          ingredient_id: ing.ingredient_id || uuidv4(),
          name: ing.name,
          qty_num: ing.qty_num || 1,
          qty_unit: ing.qty_unit || 'cup',
          shelf_life_days: ing.shelf_life_days || null,
        })),
        steps: steps.map((step) => ({ body: step.trim() })),
        tags: [],
      });

      if (error) {
        throw new Error(error);
      }

      setShowSuccess(true);

      toast.success('Recipe saved successfully!', {
        onClose: () => {
          onBack();
        },
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast.error('Failed to save recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUnits();
  }, []);

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        ingredients: initialData.ingredients || [],
        cookTime: initialData.cookTime || '',
        servings: initialData.servings || '',
        difficulty: initialData.difficulty || '',
        cuisine: initialData.cuisine || '',
        dietaryRestrictions: initialData.dietaryRestrictions || [],
      });

      if (initialData.steps && initialData.steps.length > 0) {
        setSteps(initialData.steps);
      }

      if (initialData.imageUrl) {
        setPhotoPreview(initialData.imageUrl);
      }
    }
  }, [initialData]);

  const isFormValid = validationErrors.length === 0 && formData.title.trim();

  return (
    <Box>
      {/* Top Header with Progress */}
      <Box sx={{ p: { xs: 2, sm: 3 }, pb: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Chip
              label={`Step ${currentStep} of 2`}
              color="primary"
              variant="outlined"
              size="small"
            />
          </Stack>

          {/* Top Right CTA */}
          <Button
            variant="contained"
            startIcon={isLoading ? null : <SaveIcon />}
            onClick={handleSave}
            disabled={!isFormValid || isLoading}
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
              },
            }}
          >
            {isLoading ? 'Saving...' : 'Save Recipe'}
          </Button>
        </Stack>

        {/* Progress Bar */}
        <Box sx={{ mb: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography variant="body2" color="text.secondary">
              Recipe Progress
            </Typography>
            <Typography variant="body2" color="primary.main" fontWeight={600}>
              {Math.round(calculateProgress())}% Complete
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={calculateProgress()}
            sx={{
              height: 6,
              borderRadius: 1,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 1,
              },
            }}
          />
        </Box>

        {/* Validation Status */}
        {validationErrors.length === 0 && formData.title.trim() && (
          <Alert
            icon={<CheckCircleIcon />}
            severity="success"
            sx={{ mb: 2, borderRadius: 2 }}
          >
            ✅ All fields complete! Ready to save.
          </Alert>
        )}

        {validationErrors.length > 0 && (
          <Alert
            icon={<WarningIcon />}
            severity="warning"
            sx={{ mb: 2, borderRadius: 2 }}
          >
            {validationErrors[0]}
          </Alert>
        )}

        {/* Photo Upload Section */}
        <Card
          elevation={0}
          sx={{
            mb: 4,
            border: 2,
            borderStyle: 'dashed',
            borderColor: selectedPhoto ? 'primary.main' : 'grey.300',
            borderRadius: 1,
            overflow: 'hidden',
            bgcolor: selectedPhoto ? 'primary.50' : 'grey.50',
            transition: 'all 0.3s ease',
          }}
        >
          <CardActionArea
            component="label"
            sx={{
              p: 3,
              minHeight: photoPreview ? 200 : 120,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoSelect}
              style={{ display: 'none' }}
            />

            {photoPreview ? (
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 200,
                  borderRadius: 2,
                  overflow: 'hidden',
                  backgroundImage: `url(${photoPreview})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ) : (
              <>
                <AddPhotoAlternateIcon
                  sx={{
                    fontSize: { xs: 40, sm: 48 },
                    color: 'grey.400',
                    mb: 1,
                  }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign="center"
                >
                  📸 Upload a photo of your recipe (optional)
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Preview appears immediately
                </Typography>
              </>
            )}
          </CardActionArea>
        </Card>
      </Box>

      {/* Main Content */}
      <Box sx={{ px: { xs: 2, sm: 3 }, mb: 10 }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Left Column - Core Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 1,
                border: 1,
                borderColor: 'grey.200',
                height: 'fit-content',
              }}
            >
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                🍽️ Core Details
              </Typography>

              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Recipe Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  variant="outlined"
                  placeholder="Give your recipe a catchy name..."
                  error={!formData.title.trim() && formData.title !== ''}
                  helperText={
                    !formData.title.trim() && formData.title !== ''
                      ? 'Title is required'
                      : ''
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
                  variant="outlined"
                  multiline
                  rows={3}
                  placeholder="Tell us what makes this recipe special..."
                  helperText={`${formData.description.length}/500 characters`}
                  inputProps={{ maxLength: 500 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

                <Grid container spacing={1}>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      fullWidth
                      label="Cook Time"
                      value={formData.cookTime}
                      onChange={(e) =>
                        handleInputChange('cookTime', e.target.value)
                      }
                      variant="outlined"
                      type="number"
                      placeholder="30"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">🕒</InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography variant="body2" color="text.secondary">
                              min
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 6 }}>
                    <TextField
                      fullWidth
                      label="Servings"
                      value={formData.servings}
                      onChange={(e) =>
                        handleInputChange('servings', e.target.value)
                      }
                      variant="outlined"
                      type="number"
                      placeholder="4"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">👥</InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography variant="body2" color="text.secondary">
                              people
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Advanced Fields Toggle */}
                <Button
                  variant="outlined"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  endIcon={
                    showAdvanced ? <ExpandLessIcon /> : <ExpandMoreIcon />
                  }
                  sx={{
                    borderRadius: 2,
                    borderColor: 'grey.300',
                    color: 'text.secondary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                    },
                  }}
                >
                  Advanced Options
                </Button>

                <Collapse in={showAdvanced}>
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      label="Difficulty Level"
                      value={formData.difficulty}
                      onChange={(e) =>
                        handleInputChange('difficulty', e.target.value)
                      }
                      variant="outlined"
                      placeholder="Easy, Medium, Hard"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">⭐</InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Cuisine Type"
                      value={formData.cuisine}
                      onChange={(e) =>
                        handleInputChange('cuisine', e.target.value)
                      }
                      variant="outlined"
                      placeholder="Italian, Mexican, Asian..."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">🌍</InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Stack>
                </Collapse>
              </Stack>
            </Paper>
          </Grid>

          {/* Right Column - Ingredients and Instructions */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              {/* Ingredients Section */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: 1,
                  border: 1,
                  borderColor: 'grey.200',
                }}
              >
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  🧂 Ingredients
                </Typography>

                <Stack spacing={2}>
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 3 }}>
                      <TextField
                        fullWidth
                        label="Qty"
                        value={ingredientQty}
                        onChange={(e) => setIngredientQty(e.target.value)}
                        variant="outlined"
                        type="number"
                        placeholder="2"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 3 }}>
                      <TextField
                        fullWidth
                        select
                        label="Unit"
                        value={ingredientUnit}
                        onChange={(e) => setIngredientUnit(e.target.value)}
                        variant="outlined"
                        SelectProps={{
                          native: true,
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          },
                        }}
                      >
                        {units.length === 0 ? (
                          <>
                            <option value="cup">cup</option>
                            <option value="tbsp">tbsp</option>
                            <option value="tsp">tsp</option>
                            <option value="lbs">lbs</option>
                            <option value="oz">oz</option>
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                            <option value="ml">ml</option>
                            <option value="l">l</option>
                            <option value="piece">piece</option>
                          </>
                        ) : (
                          units.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))
                        )}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <TextField
                        fullWidth
                        label="Ingredient Name"
                        value={ingredientInput}
                        onChange={(e) => setIngredientInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddIngredient();
                          }
                        }}
                        variant="outlined"
                        placeholder="e.g., flour, eggs, salt"
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={handleAddIngredient}
                              size="small"
                              disabled={!ingredientInput.trim()}
                            >
                              Add
                            </Button>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.ingredients.map((ingredient, index) => (
                      <Chip
                        key={index}
                        label={`${ingredient.qty_num || ''} ${ingredient.qty_unit || ''} ${ingredient.name}`.trim()}
                        onDelete={() => handleRemoveIngredient(index)}
                        sx={{
                          borderRadius: 2,
                          '& .MuiChip-deleteIcon': {
                            fontSize: '18px',
                          },
                        }}
                      />
                    ))}
                  </Box>

                  {formData.ingredients.length === 0 && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: 'italic' }}
                    >
                      Add ingredients with quantities and units for better
                      recipes
                    </Typography>
                  )}
                </Stack>
              </Paper>

              {/* Instructions Section */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: 1,
                  border: 1,
                  borderColor: 'grey.200',
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    📋 Instructions
                  </Typography>
                  <Button
                    size="small"
                    onClick={handleAddStep}
                    sx={{ borderRadius: 2 }}
                  >
                    + Add Step
                  </Button>
                </Stack>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={steps.map((_, i) => `step-${i}`)}
                    strategy={verticalListSortingStrategy}
                  >
                    {steps.map((step, index) => (
                      <SortableStep
                        key={`step-${index}`}
                        step={step}
                        index={index}
                        onUpdate={handleStepUpdate}
                        onDelete={handleStepDelete}
                      />
                    ))}
                  </SortableContext>
                </DndContext>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2, fontStyle: 'italic' }}
                >
                  💡 Drag steps to reorder them
                </Typography>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ maxWidth: 1200, mx: 'auto' }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            borderRadius: 2,
            px: { xs: 2, sm: 3 },
            py: 1.5,
            borderColor: 'grey.300',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'grey.400',
              bgcolor: 'grey.50',
            },
          }}
        >
          Back
        </Button>

        <Stack direction="row" alignItems="center" spacing={2}>
          {isFormValid && (
            <Typography
              variant="body2"
              color="success.main"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <CheckCircleIcon fontSize="small" />
              Ready to save!
            </Typography>
          )}

          <Fab
            variant="extended"
            color="primary"
            onClick={handleSave}
            disabled={!isFormValid || isLoading}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1,
              boxShadow: trigger
                ? '0 8px 32px rgba(25, 118, 210, 0.3)'
                : '0 4px 16px rgba(25, 118, 210, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(25, 118, 210, 0.4)',
              },
              '&:disabled': {
                bgcolor: 'grey.300',
                color: 'grey.500',
              },
            }}
          >
            {isLoading ? (
              <>Loading...</>
            ) : (
              <>
                <SaveIcon sx={{ mr: 1 }} />
                Save Recipe
              </>
            )}
          </Fab>
        </Stack>
      </Stack>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          sx={{
            borderRadius: 2,
            fontSize: '1.1rem',
            '& .MuiAlert-icon': {
              fontSize: '1.5rem',
            },
          }}
        >
          🎉 Recipe added successfully! 🍲
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ManualEntryForm;
