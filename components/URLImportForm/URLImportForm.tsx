import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { RecipeFormData } from '@/interfaces/index';
import { analyzeWebURLService } from '@/services/index';

import ManualEntryForm from '../ManualEntryForm';

// URL Import Form Component
function URLImportForm({ onBack }: { onBack: () => void }) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipeData, setRecipeData] = useState<RecipeFormData | null>(null);

  const handleImport = async () => {
    if (!url.trim()) return;
    setIsLoading(true);
    try {
      const { data, ok, error } = await analyzeWebURLService(url);
      if (ok) {
        const transformedData: RecipeFormData = {
          title: data.title || '',
          description: data.description || '',
          ingredients:
            data.ingredients?.map((ing: any) => ({
              ingredient_id: ing.ingredient_id || '',
              name: ing.name || '',
              qty_num: ing.qty_num || 1,
              qty_unit: ing.qty_unit || 'cup',
              shelf_life_days: ing.shelf_life_days || undefined,
            })) || [],
          steps: data.steps?.map((step: any) => step.body) || [''],
          cookTime: String(data.duration_min || 0),
          servings: String(data.servings || 1),
          imageUrl: data.image_url || '',
        };
        setRecipeData(transformedData);
      } else {
        console.error('Error importing from URL:', error);
      }
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
        {recipeData ? (
          <ManualEntryForm initialData={recipeData} onBack={onBack} />
        ) : (
          <>
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
          </>
        )}
      </Stack>
    </Box>
  );
}

export default URLImportForm;
