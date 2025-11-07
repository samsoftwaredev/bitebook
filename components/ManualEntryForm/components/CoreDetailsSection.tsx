import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Button,
  Collapse,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

import { RecipeFormData } from '@/interfaces';

interface CoreDetailsSectionProps {
  formData: RecipeFormData;
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  onInputChange: (field: keyof RecipeFormData, value: string) => void;
}

const CoreDetailsSection = ({
  formData,
  showAdvanced,
  onToggleAdvanced,
  onInputChange,
}: CoreDetailsSectionProps) => {
  return (
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
          value={formData.title || ''}
          onChange={(e) => onInputChange('title', e.target.value)}
          variant="outlined"
          placeholder="Give your recipe a catchy name..."
          error={
            !(formData.title || '').trim() && (formData.title || '') !== ''
          }
          helperText={
            !(formData.title || '').trim() && (formData.title || '') !== ''
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
          value={formData.description || ''}
          onChange={(e) => onInputChange('description', e.target.value)}
          variant="outlined"
          multiline
          rows={3}
          placeholder="Tell us what makes this recipe special..."
          helperText={`${(formData.description || '').length}/500 characters`}
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
              value={formData.cookTime || ''}
              onChange={(e) => onInputChange('cookTime', e.target.value)}
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
              value={formData.servings || ''}
              onChange={(e) => onInputChange('servings', e.target.value)}
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

        <Button
          variant="outlined"
          onClick={onToggleAdvanced}
          endIcon={showAdvanced ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
              value={formData.difficulty || ''}
              onChange={(e) => onInputChange('difficulty', e.target.value)}
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
              value={formData.cuisine || ''}
              onChange={(e) => onInputChange('cuisine', e.target.value)}
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
  );
};

export default CoreDetailsSection;
