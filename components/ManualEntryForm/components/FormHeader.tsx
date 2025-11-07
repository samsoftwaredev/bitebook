import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Alert,
  Box,
  Button,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

interface FormHeaderProps {
  currentStep: number;
  validationErrors: string[];
  calculateProgress: number;
  isFormValid: boolean;
  isLoading: boolean;
  formTitle: string;
  onSave: () => void;
}

const FormHeader = ({
  currentStep,
  validationErrors,
  calculateProgress,
  isFormValid,
  isLoading,
  formTitle,
  onSave,
}: FormHeaderProps) => {
  return (
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

        <Button
          variant="contained"
          startIcon={isLoading ? null : <SaveIcon />}
          onClick={onSave}
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
            {Math.round(calculateProgress)}% Complete
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={calculateProgress}
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
      {validationErrors.length === 0 && formTitle.trim() && (
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
    </Box>
  );
};

export default FormHeader;
