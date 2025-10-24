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
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import {
  Box,
  Button,
  Chip,
  DialogActions,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import * as React from 'react';
import { toast } from 'react-toastify';

import Draggable from '@/components/Draggable';
import Droppable from '@/components/Droppable';
import { Recipe } from '@/components/RecipeCard/RecipeCard.model';
import RecipeDialog from '@/components/RecipeDialog';
import RecipeDraggableCard from '@/components/RecipeDraggableCard';
import SlotDrop from '@/components/SlotDrop';
import { DayPlan, Slot } from '@/interfaces/index';
import { updateMealPlanSlotService } from '@/services/index';

interface Props {
  searchTerm: string;
  recipes: Recipe[];
  handleCardClick: (r: Recipe) => void;
  dialogOpen: boolean;
  recipe: Recipe | null;
  handleDialogClose: () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterByLabel: (label: string) => void;
  mealPlanId: string | null;
  setDays: React.Dispatch<React.SetStateAction<DayPlan[]>>;
  days: DayPlan[];
}

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

const slotId = (dayIndex: number, slot: Slot) => `slot:${dayIndex}:${slot}`;
const isSlotId = (id?: string) => id?.startsWith('slot:');
const parseSlotId = (id: string) => {
  const [, dayIndex, slot] = id.split(':');
  return { dayIndex: Number(dayIndex), slot: slot as Slot };
};

export default function WeeklyMealPlanner({
  searchTerm,
  recipes,
  handleCardClick,
  dialogOpen,
  recipe,
  handleDialogClose,
  handleSearchChange,
  onFilterByLabel,
  mealPlanId,
  setDays,
  days,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // bottom drawer state
  const [openDrawer, setOpenDrawer] = React.useState(true);

  // drag state
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [dragPreview, setDragPreview] = React.useState<Recipe | null>(null);

  const updateMealPlanSlot = async (
    slot: Slot,
    recipeId: string | null,
    mealDate: string,
  ) => {
    if (!mealPlanId) return;
    try {
      await updateMealPlanSlotService({
        mealPlanId: mealPlanId,
        date: mealDate,
        slot,
        recipeId,
      });
    } catch (error) {
      console.error('Error updating meal plan slots:', error);
      toast.error('Error updating meal plan slots');
    }
  };

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

  function handleShoppingCart() {
    // TODO: Implement shopping cart logic
  }

  function handleAIGeneratePlanner() {
    // TODO: Implement AI planner generation logic
  }

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

  async function handleDragEnd(e: DragEndEvent) {
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
        await updateMealPlanSlot(slot, recipeId, days[dayIndex].date);
        return;
      }
    } else {
      recipeId = String(active.id);
      setDays((prev) => {
        const draft = prev.map((d) => ({ ...d, slots: { ...d.slots } }));
        draft[dayIndex].slots[slot] = recipeId!;
        return draft;
      });
      await updateMealPlanSlot(slot, recipeId, days[dayIndex].date);
      return;
    }
  }

  // UI helpers
  const DrawerToggle = (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip
        size="small"
        color="success"
        label={`${recipes.length} Recipes Available`}
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
            onClick={handleAIGeneratePlanner}
            startIcon={<BoltRoundedIcon />}
            sx={{ textTransform: 'none', fontWeight: 800 }}
          >
            AI Generate Meal Plan
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleShoppingCart}
            startIcon={<ShoppingCartRoundedIcon />}
            sx={{ textTransform: 'none', fontWeight: 800 }}
          >
            Shop
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
                    bgcolor: day.isToday
                      ? alpha(theme.palette.primary.main, 0.1)
                      : theme.palette.background.paper,
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
                        <Typography color="text.primary">
                          {day.isToday ? 'TODAY' : ''}
                        </Typography>
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
                              onView={() =>
                                assigned && handleCardClick(assigned)
                              }
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
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search recipes…"
                sx={{ fontSize: 14 }}
              />
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
              {recipes.map((r) => (
                <Draggable id={r.id} key={r.id}>
                  <Box key={r.id} id={r.id}>
                    <RecipeDraggableCard
                      r={r}
                      onView={(rec) => handleCardClick(rec)}
                    />
                  </Box>
                </Draggable>
              ))}
            </Box>
          )}
        </Paper>
      </DndContext>

      {/* Detail dialog */}
      <RecipeDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        recipeData={recipe}
      >
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          <Button variant="contained" color="success">
            Add to Meal
          </Button>
        </DialogActions>
      </RecipeDialog>
    </>
  );
}
