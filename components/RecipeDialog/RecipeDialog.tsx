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
import React, { useEffect } from 'react';

import { Recipe } from '@/components/RecipeCard/RecipeCard.model';
import { RecipeDetail } from '@/interfaces/index';
import { getRecipeByIdService } from '@/services/index';

import Loading from '../Loading';

// ---- Types (shape matches your API response) -------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  recipeData: Recipe | null;
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
    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Box sx={{ color: 'text.secondary' }}>{icon}</Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="subtitle1" fontWeight={600}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

// ---- main component --------------------------------------------------------
export default function RecipeDialog({ open, onClose, recipeData }: Props) {
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
          bgcolor: '#fff', // make sure it's white
          borderRadius: { xs: 0, sm: 2 },
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 2,
          bgcolor: 'rgba(255,255,255,0.8)',
          '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Hero image */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '16/9',
          backgroundImage: `url(${recipe.recipe.image_url})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />

      <DialogContent sx={{ pt: 3 }}>
        {/* Title & description */}
        <Typography variant="h5" fontWeight={700}>
          {recipe.recipe.title}
        </Typography>
        {recipe.recipe.description && (
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {recipe.recipe.description}
          </Typography>
        )}

        {/* Stats grid */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
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
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Categories
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {recipe.tags.map((t) => (
                <Chip
                  key={t}
                  size="small"
                  label={t}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Ingredients */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={800} gutterBottom>
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
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Instructions
            </Typography>
            <Stack spacing={1.25} sx={{ mb: 1 }}>
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
          </Box>
        )}

        <Divider sx={{ mt: 3 }} />
        {/* Footer spacing for mobile safe area */}
        <Box sx={{ height: 8 }} />
      </DialogContent>
    </Dialog>
  );
}
