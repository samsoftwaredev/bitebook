import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface SuccessSnackbarProps {
  open: boolean;
  onClose: () => void;
}

const SuccessSnackbar: React.FC<SuccessSnackbarProps> = ({ open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
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
  );
};

export default SuccessSnackbar;
