import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

function PhotoImportForm({ onBack }: { onBack: () => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      // TODO: Implement photo import logic
      console.log('Importing from photo:', selectedFile.name);
      // Add your photo import logic here
    } catch (error) {
      console.error('Error importing from photo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={600}>
          Import Recipe from Photo
        </Typography>

        <Box
          sx={{
            border: 2,
            borderStyle: 'dashed',
            borderColor: 'grey.300',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            bgcolor: 'grey.50',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'primary.50',
            },
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            id="photo-upload"
          />
          <label htmlFor="photo-upload" style={{ cursor: 'pointer' }}>
            <CameraAltIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              {selectedFile
                ? selectedFile.name
                : 'Click to upload a recipe photo'}
            </Typography>
          </label>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleImport}
            disabled={!selectedFile || isLoading}
            sx={{ borderRadius: 2, px: 3 }}
          >
            {isLoading ? 'Processing...' : 'Import Recipe'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default PhotoImportForm;
