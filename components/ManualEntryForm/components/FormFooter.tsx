import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Fab, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

interface FormFooterProps {
  isFormValid: boolean;
  isLoading: boolean;
  trigger: boolean;
  onBack: () => void;
  onSave: () => void;
}

const FormFooter: React.FC<FormFooterProps> = ({
  isFormValid,
  isLoading,
  trigger,
  onBack,
  onSave,
}) => {
  return (
    <Paper
      elevation={trigger ? 8 : 2}
      sx={{
        p: { xs: 2, sm: 3 },
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        transition: 'all 0.3s ease',
      }}
    >
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
            onClick={onSave}
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
    </Paper>
  );
};

export default FormFooter;
