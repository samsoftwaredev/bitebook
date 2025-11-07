import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

import { IngredientFormData } from '@/interfaces/index';

interface IngredientsSectionProps {
  ingredients: IngredientFormData[];
  ingredientInput: string;
  ingredientQty: string;
  ingredientUnit: string;
  units: string[];
  editingIngredient: number | null;
  onIngredientInputChange: (value: string) => void;
  onIngredientQtyChange: (value: string) => void;
  onIngredientUnitChange: (value: string) => void;
  onAddIngredient: () => void;
  onRemoveIngredient: (index: number) => void;
  onEditIngredient: (index: number) => void;
}

const IngredientsSection = ({
  ingredients,
  ingredientInput,
  ingredientQty,
  ingredientUnit,
  units,
  editingIngredient,
  onIngredientInputChange,
  onIngredientQtyChange,
  onIngredientUnitChange,
  onAddIngredient,
  onRemoveIngredient,
  onEditIngredient,
}: IngredientsSectionProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddIngredient();
    }
  };

  return (
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
              onChange={(e) => onIngredientQtyChange(e.target.value)}
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
              onChange={(e) => onIngredientUnitChange(e.target.value)}
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
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="Ingredient Name"
              value={ingredientInput}
              onChange={(e) => onIngredientInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              placeholder="e.g., flour, eggs, salt"
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={onAddIngredient}
                    size="small"
                    disabled={!ingredientInput.trim()}
                  >
                    {editingIngredient !== null ? 'Update' : 'Add'}
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
          {ingredients.map((ingredient, index) => (
            <Chip
              key={index}
              label={`${ingredient.qty_num || ''} ${ingredient.qty_unit || ''} ${ingredient.name}`.trim()}
              onDelete={() => onRemoveIngredient(index)}
              onClick={() => onEditIngredient(index)}
              sx={{
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'primary.50',
                },
                '& .MuiChip-deleteIcon': {
                  fontSize: '18px',
                },
              }}
            />
          ))}
        </Box>

        {ingredients.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            Add ingredients with quantities and units for better recipes
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default IngredientsSection;
