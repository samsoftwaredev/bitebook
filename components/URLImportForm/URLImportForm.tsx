import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

// URL Import Form Component
function URLImportForm({ onBack }: { onBack: () => void }) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    if (!url.trim()) return;

    setIsLoading(true);
    try {
      // TODO: Implement URL import logic
      console.log('Importing from URL:', url);
      // Add your URL import logic here
    } catch (error) {
      console.error('Error importing from URL:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={600}>
          Import Recipe from URL
        </Typography>

        <TextField
          fullWidth
          label="Recipe URL"
          placeholder="https://example.com/recipe"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          variant="outlined"
          multiline={false}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

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
            disabled={!url.trim() || isLoading}
            sx={{ borderRadius: 2, px: 3 }}
          >
            {isLoading ? 'Importing...' : 'Import Recipe'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default URLImportForm;
