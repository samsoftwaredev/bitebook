import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import React, { useEffect } from 'react';

import { RecipeDetail, RecipeType } from '@/interfaces';
import { getRecipeByIdService } from '@/services';

import Loading from '../Loading';

type Props = {
  open: boolean;
  onClose: () => void;
  recipeData: RecipeType | null;
  children?: React.ReactNode;
};

// ---- helpers ---------------------------------------------------------------
const money = (cents?: number) =>
  cents != null
    ? new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
      }).format(cents / 100)
    : undefined;

const pluralize = (unit: string, qty: number) =>
  qty === 1 || ['each'].includes(unit) ? unit : `${unit}s`;

const prettyQty = (n: number) => {
  const whole = Math.floor(n);
  const frac = +(n - whole).toFixed(2);
  const map: Record<number, string> = { 0.25: '¼', 0.5: '½', 0.75: '¾' };
  if (map[frac]) return whole ? `${whole}${map[frac]}` : map[frac];
  return n.toString();
};

const shelfLifeText = (d: number | null | undefined) =>
  d == null ? '' : d === 1 ? '(1d shelf life)' : `(${d}d shelf life)`;

// ---- stat card -------------------------------------------------------------
function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        height: '100%',
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Box sx={{ color: 'primary.main' }}>{icon}</Box>
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {label}
          </Typography>
          <Typography variant="subtitle1" fontWeight={700}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default function RecipeDialog({
  open,
  onClose,
  recipeData,
  children = null,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoading, setIsLoading] = React.useState(false);
  const [recipe, setRecipe] = React.useState<RecipeDetail | null>(null);

  const getRecipeById = async (id: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await getRecipeByIdService(id);
      if (error) {
        console.error('Error fetching recipe details:', error);
        return;
      }
      setRecipe(data);
      // In a real app, you would update state with the fetched recipe details
      console.log('Fetched recipe details:', data);
    } catch (err) {
      console.error('Unexpected error fetching recipe details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Recipe ID changed:', recipeData?.id);
    if (recipeData !== null) {
      getRecipeById(recipeData.id);
    }
  }, [recipeData?.id]);

  if (!recipeData) return null;

  if (isLoading || !recipe) return <Loading />;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          position: 'relative',
          overflow: 'hidden',
          borderRadius: { xs: 0, sm: 2 },
          // Hero image as background
          backgroundImage: `url(${recipe.recipe.image_url})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          // Create overlay effect
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 40%, rgba(255,255,255,0.95) 60%, rgba(255,255,255,1) 100%)',
            zIndex: 0,
          },
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 16,
          top: 16,
          zIndex: 10,
          bgcolor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,1)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        sx={{
          position: 'relative',
          zIndex: 1,
          pt: { xs: 8, sm: 10 }, // Add more top padding to account for background
          pb: 3,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '200px', sm: '300px', md: '400px' },
            mb: 3,
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          <Image
            style={{
              objectFit: 'cover',
            }}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 80vw, 70vw"
            src={recipe.recipe.image_url}
            alt={recipe.recipe.title}
            priority
          />
        </Box>
        {/* Title & description with enhanced styling for overlay */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            fontWeight={800}
            sx={{
              color: 'white',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              mb: 1,
            }}
          >
            {recipe.recipe.title}
          </Typography>
          {recipe.recipe.description && (
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.95)',
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                fontSize: { xs: '0.95rem', sm: '1rem' },
              }}
            >
              {recipe.recipe.description}
            </Typography>
          )}
        </Box>

        {/* Stats grid with enhanced background */}
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid item xs={6} sm={3}>
            <Stat
              icon={<AccessTimeIcon fontSize="small" />}
              label="Duration"
              value={`${recipe.recipe.duration_min} min`}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Stat
              icon={<AttachMoneyIcon fontSize="small" />}
              label="Cost"
              value={money(recipe.recipe.est_cost_cents)}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Stat
              icon={<RestaurantIcon fontSize="small" />}
              label="Servings"
              value={recipe.recipe.servings}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Stat
              icon={<EventAvailableIcon fontSize="small" />}
              label="Shelf Life"
              value={
                recipe.recipe.shelf_life_days == null
                  ? '—'
                  : recipe.recipe.shelf_life_days === 1
                    ? '1 day'
                    : `${recipe.recipe.shelf_life_days} days`
              }
            />
          </Grid>
        </Grid>

        {/* Health score */}
        <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <EmojiNatureIcon color="success" />
            <Typography variant="subtitle2" color="text.secondary">
              Health Score
            </Typography>
            <Typography variant="subtitle1" fontWeight={700}>
              {recipe.recipe.health_score ?? '—'}/100
            </Typography>
          </Stack>
        </Paper>

        {/* Tags */}
        {recipe.tags?.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography
              sx={{
                color: 'white',
                textShadow: '0 2px 8px rgba(0,0,0,0.9)',
              }}
              variant="subtitle1"
              fontWeight={700}
              gutterBottom
            >
              Categories
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {recipe.tags.map((t) => (
                <Chip key={t} size="small" label={t} color="primary" />
              ))}
            </Stack>
          </Box>
        )}

        {/* Ingredients */}
        <Box sx={{ mt: 3 }}>
          <Typography
            sx={{
              color: 'white',
              textShadow: '0 2px 8px rgba(0,0,0,0.9)',
            }}
            variant="h6"
            fontWeight={800}
            gutterBottom
          >
            Ingredients
          </Typography>

          <Stack spacing={1.2}>
            {recipe.ingredients.map((ing) => (
              <Paper
                key={ing.ingredient_id}
                variant="outlined"
                sx={{
                  p: { xs: 1, sm: 1.25 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="body2" sx={{ pr: 2 }}>
                  {ing.name}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="success.main"
                  >
                    {`${prettyQty(ing.qty_num)} ${pluralize(ing.qty_unit, ing.qty_num)}`}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {shelfLifeText(ing.shelf_life_days)}
                  </Typography>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Box>

        {/* Steps */}
        {recipe.steps?.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography
              sx={{
                color: 'white',
                textShadow: '0 2px 8px rgba(0,0,0,0.9)',
              }}
              variant="h6"
              fontWeight={800}
              gutterBottom
            >
              Instructions
            </Typography>
            <Paper>
              <Stack spacing={1.25} sx={{ mb: 1, p: 2 }}>
                {recipe.steps
                  .slice()
                  .sort((a, b) => a.step_no - b.step_no)
                  .map((s) => (
                    <Box key={s.step_no} sx={{ display: 'flex', gap: 1 }}>
                      <Box
                        sx={{
                          minWidth: 28,
                          height: 28,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: '#fff',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: 13,
                          mt: '2px',
                        }}
                      >
                        {s.step_no}
                      </Box>
                      <Typography variant="body2" sx={{ mt: '2px' }}>
                        {s.body}
                      </Typography>
                    </Box>
                  ))}
              </Stack>
            </Paper>
          </Box>
        )}

        <Divider sx={{ mt: 3 }} />
        {children}
        <Box sx={{ height: 8 }} />
      </DialogContent>
    </Dialog>
  );
}
