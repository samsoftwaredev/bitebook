import AddIcon from '@mui/icons-material/Add';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

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
          <Grid item xs={12} sm={4} key={category.id}>
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

// Photo Import Form Component
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

// Manual Entry Form Component
function ManualEntryForm({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    cookTime: '',
    servings: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: Implement manual recipe save logic
    console.log('Saving manual recipe:', formData);
    // Add your save logic here
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={600}>
          Add Recipe Manually
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Recipe Title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              variant="outlined"
              multiline
              rows={2}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cook Time (minutes)"
              value={formData.cookTime}
              onChange={(e) => handleInputChange('cookTime', e.target.value)}
              variant="outlined"
              type="number"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Servings"
              value={formData.servings}
              onChange={(e) => handleInputChange('servings', e.target.value)}
              variant="outlined"
              type="number"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ingredients"
              value={formData.ingredients}
              onChange={(e) => handleInputChange('ingredients', e.target.value)}
              variant="outlined"
              multiline
              rows={4}
              placeholder="List ingredients, one per line"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Instructions"
              value={formData.instructions}
              onChange={(e) =>
                handleInputChange('instructions', e.target.value)
              }
              variant="outlined"
              multiline
              rows={4}
              placeholder="Write step-by-step instructions"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
        </Grid>

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
            onClick={handleSave}
            disabled={!formData.title.trim()}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Save Recipe
          </Button>
        </Stack>
      </Stack>
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
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 2 },
          minHeight: { xs: '100vh', sm: 'auto' },
        },
      }}
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
            Add New Recipe
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
