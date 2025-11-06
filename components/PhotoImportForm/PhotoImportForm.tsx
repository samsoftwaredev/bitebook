import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { AddRecipeService, RecipeFormData } from '@/interfaces/index';
import { analyzeRecipeImageService } from '@/services/index';

import ManualEntryForm from '../ManualEntryForm';

function PhotoImportForm({ onBack }: { onBack: () => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [recipeData, setRecipeData] = useState<RecipeFormData | null>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsLoading(true);

      try {
        // Automatically analyze the image when uploaded
        const { data, ok } = await analyzeRecipeImageService(file);

        if (!ok) {
          throw new Error('Image analysis failed');
        }

        setAnalysisResult(data);

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
      } catch (error) {
        console.error('Error analyzing uploaded image:', error);
        toast.error('Failed to analyze the recipe image. Please try again.');
        setAnalysisResult(null);
        setSelectedFile(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleImport = async () => {
    if (!selectedFile || !analysisResult) return;

    setIsLoading(true);
    try {
      // Use the analysis result to import the recipe
      console.log('Importing recipe from photo analysis:', analysisResult);
      console.log('Original file:', selectedFile.name);

      // TODO: Process the analysisResult to create/save the recipe
      // The analysisResult should contain recipe details like:
      // - title, ingredients, instructions, etc.
    } catch (error) {
      console.error('Error importing recipe from analysis:', error);
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
        {recipeData ? (
          <ManualEntryForm initialData={recipeData} onBack={onBack} />
        ) : (
          <>
            <Box
              sx={{
                border: 2,
                borderStyle: 'dashed',
                borderColor: isLoading ? 'primary.main' : 'grey.300',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                bgcolor: isLoading ? 'primary.50' : 'grey.50',
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
                disabled={isLoading}
              />
              <label
                htmlFor="photo-upload"
                style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
              >
                <CameraAltIcon
                  sx={{ fontSize: 48, color: 'grey.400', mb: 2 }}
                />
                <Typography variant="body1" color="text.secondary">
                  {isLoading
                    ? 'Analyzing recipe image...'
                    : selectedFile
                      ? `${selectedFile.name} ${analysisResult ? '✓ Analyzed' : ''}`
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
                disabled={!selectedFile || !analysisResult || isLoading}
                sx={{ borderRadius: 2, px: 3 }}
                startIcon={isLoading ? <CircularProgress /> : null}
              >
                {isLoading ? 'Processing...' : 'Import Recipe'}
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default PhotoImportForm;
