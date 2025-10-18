import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';

import { Recipe } from '@/components/RecipeCard/RecipeCard.model';
import ScorePill from '@/components/ScorePill';
import { getRecipeByIdService } from '@/services/index';

interface RecipeDialogProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
}

export default function RecipeDialog({
  recipe,
  open,
  onClose,
}: RecipeDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Sample ingredients data - in a real app this would come from the recipe object
  const sampleIngredients = [
    '2 cups quinoa, rinsed',
    '1 large sweet potato, diced',
    '1 cup broccoli florets',
    '1 red bell pepper, sliced',
    '1 cucumber, diced',
    '1/2 red onion, thinly sliced',
    '1/4 cup tahini',
    '2 tbsp lemon juice',
    '2 tbsp olive oil',
    '1 tsp ground cumin',
    'Salt and pepper to taste',
    '2 tbsp pumpkin seeds',
    'Fresh cilantro for garnish',
  ];

  const getRecipeById = async (id: string) => {
    try {
      const { data, error } = await getRecipeByIdService(id);
      if (error) {
        console.error('Error fetching recipe details:', error);
        return;
      }
      // In a real app, you would update state with the fetched recipe details
      console.log('Fetched recipe details:', data);
    } catch (err) {
      console.error('Unexpected error fetching recipe details:', err);
    }
  };

  useEffect(() => {
    console.log('Recipe ID changed:', recipe?.id);
    if (recipe !== null) {
      getRecipeById(recipe.id);
    }
  }, [recipe?.id]);

  if (!recipe) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle sx={{ p: 0, position: 'relative' }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            component="img"
            src={recipe.img}
            alt={recipe.title}
            sx={{
              width: '100%',
              height: { xs: 200, sm: 300 },
              objectFit: 'cover',
            }}
          />

          {/* Close button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
              boxShadow: '0 4px 12px rgba(0,0,0,.15)',
            }}
          >
            <CloseRoundedIcon />
          </IconButton>

          {/* Favorite button */}
          <IconButton
            sx={{
              position: 'absolute',
              right: 16,
              top: 70,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
              boxShadow: '0 4px 12px rgba(0,0,0,.15)',
            }}
          >
            <FavoriteBorderRoundedIcon />
          </IconButton>

          {/* Score pill */}
          <Box sx={{ position: 'absolute', left: 16, bottom: 16 }}>
            <ScorePill score={recipe.score} />
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Recipe title and description */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            fontWeight={800}
            gutterBottom
            sx={{ mb: 1 }}
          >
            {recipe.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {recipe.desc}
          </Typography>

          {/* Tags */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 2, flexWrap: 'wrap', rowGap: 1 }}
          >
            {recipe.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  textTransform: 'lowercase',
                  bgcolor: alpha('#0FB77A', 0.1),
                  color: '#0FB77A',
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>

          {/* Time and price */}
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeRoundedIcon fontSize="small" color="action" />
              <Typography variant="body2" fontWeight={600}>
                {recipe.time}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AttachMoneyRoundedIcon fontSize="small" color="success" />
              <Typography variant="body2" fontWeight={700} color="success.main">
                {recipe.price}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Ingredients section */}
        <Box>
          <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
            🥘 Ingredients
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {sampleIngredients.map((ingredient, index) => (
              <Box
                component="li"
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  mb: 1.5,
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: alpha('#0FB77A', 0.04),
                  border: `1px solid ${alpha('#0FB77A', 0.1)}`,
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    mr: 2,
                    minWidth: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: '#0FB77A',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  {ingredient}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
