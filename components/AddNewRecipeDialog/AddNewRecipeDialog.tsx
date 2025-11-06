import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

import { ManualEntryForm, PhotoImportForm, URLImportForm } from '@/components';

type Props = {
  open: boolean;
  onClose: () => void;
};

type RecipeCategory = 'url' | 'photo' | 'manual' | null;

// Category selection cards data
const categories = [
  {
    id: 'url' as RecipeCategory,
    title: 'Import from URL',
    description: 'Import recipe from a website URL',
    icon: <LinkIcon sx={{ fontSize: { xs: 40, sm: 48 } }} />,
    color: '#1976d2',
  },
  {
    id: 'photo' as RecipeCategory,
    title: 'Import from Photo',
    description: 'Upload a recipe photo to extract information',
    icon: <PhotoCameraIcon sx={{ fontSize: { xs: 40, sm: 48 } }} />,
    color: '#388e3c',
  },
  {
    id: 'manual' as RecipeCategory,
    title: 'Add Manually',
    description: 'Create recipe from scratch',
    icon: <EditIcon sx={{ fontSize: { xs: 40, sm: 48 } }} />,
    color: '#f57c00',
  },
];

// Category Selection Component
function CategorySelection({
  onCategorySelect,
}: {
  onCategorySelect: (category: RecipeCategory) => void;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        fontWeight={600}
        textAlign="center"
        sx={{ mb: { xs: 2, sm: 3 }, color: 'text.primary' }}
      >
        How would you like to add your recipe?
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {categories.map((category) => (
          <Grid size={{ xs: 12, sm: 4 }} key={category.id}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                border: 2,
                borderColor: 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: category.color,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${category.color}20`,
                },
              }}
            >
              <CardActionArea
                onClick={() => onCategorySelect(category.id)}
                sx={{
                  height: '100%',
                  p: { xs: 2, sm: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: { xs: 120, sm: 160 },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 0 }}>
                  <Box
                    sx={{
                      color: category.color,
                      mb: { xs: 1, sm: 2 },
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography
                    variant={isMobile ? 'subtitle1' : 'h6'}
                    fontWeight={600}
                    sx={{ mb: 1, color: 'text.primary' }}
                  >
                    {category.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                  >
                    {category.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function AddNewRecipeDialog({ open, onClose }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedCategory, setSelectedCategory] =
    useState<RecipeCategory>(null);

  const handleClose = () => {
    setSelectedCategory(null);
    onClose();
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const renderContent = () => {
    if (!selectedCategory) {
      return <CategorySelection onCategorySelect={setSelectedCategory} />;
    }

    switch (selectedCategory) {
      case 'url':
        return <URLImportForm onBack={handleBackToCategories} />;
      case 'photo':
        return <PhotoImportForm onBack={handleBackToCategories} />;
      case 'manual':
        return <ManualEntryForm onBack={handleBackToCategories} />;
      default:
        return <CategorySelection onCategorySelect={setSelectedCategory} />;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={isMobile}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: 1,
          borderColor: 'divider',
          p: { xs: 2, sm: 3 },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <AddIcon color="primary" />
          <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight={600}>
            Add Recipe 🧑‍🍳
          </Typography>
        </Stack>

        <IconButton
          onClick={handleClose}
          sx={{
            '&:hover': {
              bgcolor: 'grey.100',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>{renderContent()}</DialogContent>
    </Dialog>
  );
}
