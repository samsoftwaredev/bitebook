// WeeklyMealPlanner.tsx
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  MouseSensor,
  TouchSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import * as React from 'react';

import Draggable from '@/components/Draggable';
import Droppable from '@/components/Droppable/Droppable';

// ---------- Types & sample data ----------
type Slot = 'breakfast' | 'lunch' | 'dinner';

type Recipe = {
  id: string;
  title: string;
  img: string;
  time: string;
  price: string;
  tags: string[];
  desc?: string;
};

type DayPlan = {
  key: string; // e.g., "Mon 20"
  slots: Record<Slot, string | null>; // recipe id or null
};

const SLOT_LABEL: Record<Slot, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
};

const EMOJI: Record<Slot, string> = {
  breakfast: '🍳',
  lunch: '🥗',
  dinner: '🌙',
};

const sampleRecipes: Recipe[] = Array.from({ length: 14 }).map((_, i) => ({
  id: `r${i + 1}`,
  title: [
    'Mediterranean Chickpea Salad',
    'Blueberry Pancakes',
    'Quinoa Buddha Bowl',
    'Spicy Korean Beef Bowl',
    'Rainbow Fruit Kabobs',
    'Classic Margherita Pizza',
    'No-Bake Energy Bites',
  ][i % 7],
  img: `https://picsum.photos/seed/meal${i}/640/420`,
  time: ['15m', '25m', '30m', '40m', '20m'][i % 5],
  price: ['$8', '$9', '$11', '$13', '$6'][i % 5],
  tags: [['vegan'], ['breakfast'], ['dinner'], ['high-protein'], ['dessert']][
    i % 5
  ],
  desc: 'A tasty, budget-friendly recipe with fresh ingredients. Perfect for weekly meal planning and reducing food waste.',
}));

const weekTemplate: DayPlan[] = [
  'Mon 20',
  'Tue 21',
  'Wed 22',
  'Thu 23',
  'Fri 24',
  'Sat 25',
  'Sun 26',
].map((k) => ({
  key: k,
  slots: { breakfast: null, lunch: null, dinner: null },
}));

// ---------- Helpers ----------
const slotId = (dayIndex: number, slot: Slot) => `slot:${dayIndex}:${slot}`;
const isSlotId = (id?: string) => id?.startsWith('slot:');
const parseSlotId = (id: string) => {
  const [, dayIndex, slot] = id.split(':');
  return { dayIndex: Number(dayIndex), slot: slot as Slot };
};

// ---------- UI atoms ----------
function SlotDrop({
  active,
  assigned,
  label,
  emoji,
  onView,
}: {
  active?: boolean;
  assigned?: Recipe | null;
  label: string;
  emoji: string;
  onView?: () => void;
}) {
  const theme = useTheme();
  const border = active
    ? `2px dashed ${alpha(theme.palette.success.main, 0.8)}`
    : `2px dashed ${alpha(theme.palette.text.primary, 0.15)}`;
  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        height: 96,
        p: 1,
        borderRadius: 1,
        border,
        bgcolor: assigned
          ? alpha(theme.palette.success.main, 0.04)
          : alpha(theme.palette.common.black, 0.02),
        overflow: 'hidden',
        transition: 'border-color .15s ease, transform .1s ease',
        ...(active && { transform: 'scale(1.01)' }),
      }}
    >
      {!assigned ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ height: '100%', color: 'text.secondary', fontSize: 12 }}
        >
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            {emoji} {label}
          </Typography>
        </Stack>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ height: '100%' }}
        >
          <Box
            component="img"
            src={assigned.img}
            alt={assigned.title}
            sx={{
              width: 120,
              height: '100%',
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="subtitle2" noWrap fontWeight={800}>
              {assigned.title}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip size="small" label={assigned.time} variant="outlined" />
              <Chip size="small" label={assigned.price} color="success" />
            </Stack>
          </Box>
          <Tooltip title="View recipe">
            <IconButton size="small" onClick={onView}>
              <VisibilityRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Paper>
  );
}

function RecipeCard({
  r,
  onView,
}: {
  r: Recipe;
  onView: (rec: Recipe) => void;
}) {
  return (
    <Paper
      id={r.id}
      elevation={1}
      sx={{
        width: 220,
        flex: '0 0 auto',
        borderRadius: 1,
        overflow: 'hidden',
        transition: 'transform .12s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0,0,0,.12)',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={r.img}
          alt={r.title}
          sx={{ width: '100%', height: 120, objectFit: 'cover' }}
        />
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ position: 'absolute', top: 6, right: 6 }}
        >
          <Tooltip title="View details">
            <IconButton
              size="small"
              onClick={() => onView(r)}
              sx={{ bgcolor: alpha('#000', 0.5), color: '#fff' }}
            >
              <VisibilityRoundedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      <Box sx={{ p: 1 }}>
        <Typography variant="subtitle2" noWrap fontWeight={800}>
          {r.title}
        </Typography>
        <Stack direction="row" spacing={0.5}>
          <Chip size="small" label={r.time} variant="outlined" />
          <Chip size="small" label={r.price} color="success" />
        </Stack>
      </Box>
    </Paper>
  );
}

// ---------- Main component ----------
export default function WeeklyMealPlanner() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // planner state
  const [days, setDays] = React.useState<DayPlan[]>(weekTemplate);
  const [recipes] = React.useState<Recipe[]>(sampleRecipes);

  // bottom drawer state
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const [showSearch, setShowSearch] = React.useState(false);
  const [q, setQ] = React.useState('');

  // dialog state
  const [viewing, setViewing] = React.useState<Recipe | null>(null);

  // drag state
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [dragPreview, setDragPreview] = React.useState<Recipe | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
  );

  const lookupRecipe = React.useCallback(
    (id: string | null | undefined) => recipes.find((r) => r.id === id) || null,
    [recipes],
  );

  const filteredRecipes = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return recipes;
    return recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(term) ||
        r.tags.join(' ').toLowerCase().includes(term),
    );
  }, [q, recipes]);

  // DnD handlers
  function handleDragStart(e: DragStartEvent) {
    const id = String(e.active.id);
    setActiveId(id);

    if (isSlotId(id)) {
      const { dayIndex, slot } = parseSlotId(id);
      setDragPreview(lookupRecipe(days[dayIndex].slots[slot]));
    } else {
      setDragPreview(lookupRecipe(id));
    }
  }

  function handleDragOver(_e: DragOverEvent) {
    // we just use highlight styles via activeId + droppable ids
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    setActiveId(null);
    setDragPreview(null);
    if (!over) return;

    const overId = String(over.id);
    if (!isSlotId(overId)) return;

    const { dayIndex, slot } = parseSlotId(overId);

    // identify the recipe id being dragged
    let recipeId: string | null = null;
    if (isSlotId(String(active.id))) {
      const from = parseSlotId(String(active.id));
      recipeId = days[from.dayIndex].slots[from.slot];
      // clear from source
      if (recipeId && (from.dayIndex !== dayIndex || from.slot !== slot)) {
        setDays((prev) => {
          const draft = prev.map((d) => ({ ...d, slots: { ...d.slots } }));
          draft[from.dayIndex].slots[from.slot] = null;
          draft[dayIndex].slots[slot] = recipeId;
          return draft;
        });
        return;
      }
    } else {
      recipeId = String(active.id);
      setDays((prev) => {
        const draft = prev.map((d) => ({ ...d, slots: { ...d.slots } }));
        draft[dayIndex].slots[slot] = recipeId!;
        return draft;
      });
      return;
    }
  }

  // UI helpers
  const DrawerToggle = (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip
        size="small"
        color="success"
        label={`${filteredRecipes.length} Recipes Available`}
        sx={{ fontWeight: 800 }}
      />
      <IconButton size="small" onClick={() => setOpenDrawer((o) => !o)}>
        {openDrawer ? <ExpandMoreRoundedIcon /> : <ExpandLessRoundedIcon />}
      </IconButton>
    </Stack>
  );

  return (
    <>
      {/* Top bar */}
      <Stack direction="row" spacing={1} alignItems="center">
        <CalendarMonthRoundedIcon />
        <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight={900}>
          Weekly Meal Planner
        </Typography>
        <Chip
          size="small"
          label="$103.00"
          color="success"
          sx={{ fontWeight: 900, ml: 1 }}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1 }}
        spacing={1}
      >
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="warning"
            startIcon={<BoltRoundedIcon />}
            sx={{ textTransform: 'none', fontWeight: 800 }}
          >
            AI Plan
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<ShoppingCartRoundedIcon />}
            sx={{ textTransform: 'none', fontWeight: 800 }}
          >
            Shop
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveRoundedIcon />}
            sx={{ textTransform: 'none', fontWeight: 800 }}
          >
            Save
          </Button>
        </Stack>
      </Stack>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {/* Planner grid (no scrolling; content fits) */}
        <Box sx={{ px: 2, overflow: 'hidden' }}>
          <Grid
            container
            spacing={1}
            sx={{
              // compact rows that fit in one screen (adjust heights if needed)
              height: { xs: 'calc(100vh - 220px)', md: 'calc(100vh - 240px)' },
              overflow: 'hidden',
            }}
          >
            {days.map((day, dIdx) => (
              <Grid key={day.key} item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: theme.palette.background.paper,
                    boxShadow: '0 1px 0 rgba(0,0,0,.04)',
                  }}
                >
                  <Grid container spacing={1} alignItems="center">
                    {/* Day tag */}
                    <Grid item xs={2} sm={1.2 as any} md={1}>
                      <Stack
                        alignItems="center"
                        spacing={0}
                        sx={{ minWidth: 56 }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {day.key.split(' ')[0].toUpperCase()}
                        </Typography>
                        <Typography fontWeight={900}>
                          {day.key.split(' ')[1]}
                        </Typography>
                      </Stack>
                    </Grid>

                    {/* 3 slots */}
                    {(Object.keys(day.slots) as Slot[]).map((slot) => {
                      const id = slotId(dIdx, slot);
                      const assigned = lookupRecipe(day.slots[slot]);
                      const active =
                        activeId &&
                        isSlotId(String(activeId)) &&
                        String(activeId) === id;
                      return (
                        <Grid
                          key={id}
                          item
                          xs={10 / 3}
                          sm={(11 / 3) as any}
                          md={(11 / 3) as any}
                        >
                          <div id={id} />
                          <Droppable id={id}>
                            <SlotDrop
                              active={Boolean(active)}
                              assigned={assigned}
                              label={SLOT_LABEL[slot]}
                              emoji={EMOJI[slot]}
                              onView={() => assigned && setViewing(assigned)}
                            />
                          </Droppable>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <DragOverlay dropAnimation={{ duration: 150 }}>
            {dragPreview ? (
              <Paper
                sx={{
                  width: 220,
                  borderRadius: 1,
                  overflow: 'hidden',
                  boxShadow: '0 12px 28px rgba(0,0,0,.25)',
                }}
              >
                <Box
                  component="img"
                  src={dragPreview.img}
                  alt={dragPreview.title}
                  sx={{ width: '100%', height: 120, objectFit: 'cover' }}
                />
                <Box sx={{ p: 1 }}>
                  <Typography noWrap variant="subtitle2" fontWeight={800}>
                    {dragPreview.title}
                  </Typography>
                </Box>
              </Paper>
            ) : null}
          </DragOverlay>
        </Box>

        {/* Bottom Drawer / Recipes carousel */}
        <Paper
          elevation={8}
          sx={{
            position: 'relative',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            px: 2,
            pt: 1,
            pb: openDrawer ? 1.5 : 0.5,
          }}
        >
          {/* Drawer header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {DrawerToggle}
            <Paper
              sx={{
                ml: 'auto',
                p: 0.5,
                px: 1,
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                minWidth: 220,
                bgcolor: alpha(theme.palette.text.primary, 0.06),
              }}
            >
              <SearchRoundedIcon fontSize="small" sx={{ mr: 1 }} />
              <InputBase
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search recipes…"
                sx={{ fontSize: 14 }}
              />
              {!!q && (
                <IconButton size="small" onClick={() => setQ('')}>
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              )}
            </Paper>
          </Stack>

          {/* Cards row */}
          {openDrawer && (
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                gap: 5,
                overflowX: 'auto',
                pb: 0.5,
                scrollSnapType: 'x mandatory',
                '&::-webkit-scrollbar': { height: 6 },
              }}
            >
              {filteredRecipes.map((r) => (
                <Draggable id={r.id} key={r.id}>
                  <Box key={r.id} id={r.id}>
                    <RecipeCard r={r} onView={(rec) => setViewing(rec)} />
                  </Box>
                </Draggable>
              ))}
            </Box>
          )}
        </Paper>
      </DndContext>

      {/* Detail dialog */}
      <Dialog
        open={!!viewing}
        onClose={() => setViewing(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 900 }}>{viewing?.title}</DialogTitle>
        <DialogContent dividers>
          {viewing && (
            <Stack spacing={2}>
              <Box
                component="img"
                src={viewing.img}
                alt={viewing.title}
                sx={{
                  width: '100%',
                  height: 240,
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
              <Stack direction="row" spacing={1}>
                <Chip label={viewing.time} variant="outlined" />
                <Chip label={viewing.price} color="success" />
                {viewing.tags.map((t) => (
                  <Chip key={t} label={t} size="small" />
                ))}
              </Stack>
              <Typography color="text.secondary">{viewing.desc}</Typography>
              <Box>
                <Typography fontWeight={800} gutterBottom>
                  Ingredients
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 2 cups mixed veggies · 1 cup grains · olive oil · spices
                </Typography>
              </Box>
              <Box>
                <Typography fontWeight={800} gutterBottom>
                  Instructions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  1) Prep ingredients 2) Sauté 3) Simmer 4) Serve and enjoy.
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewing(null)}>Close</Button>
          <Button variant="contained" color="success">
            Add to Meal
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
