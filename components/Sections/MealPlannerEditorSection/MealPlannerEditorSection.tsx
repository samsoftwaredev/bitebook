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
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  DialogActions,
  Grid,
  Paper,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';

import { RecipeDialog } from '@/components';
import { RecipeListSelector } from '@/components';
import { SlotDrop } from '@/components';
import { Droppable } from '@/components';
import { DayPlan, RecipeType, Slot } from '@/interfaces';
import { updateMealPlanSlotService } from '@/services';

interface Props {
  searchTerm: string;
  recipes: RecipeType[];
  handleCardClick: (r: RecipeType) => void;
  dialogOpen: boolean;
  recipe: RecipeType | null;
  handleDialogClose: () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterByLabel: (label: string) => void;
  mealPlanId: string | null;
  setDays: React.Dispatch<React.SetStateAction<DayPlan[]>>;
  days: DayPlan[];
  handleSendToShoppingList: (completed: () => void) => void;
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
  handleSendToShoppingList,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // bottom drawer state
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isLoadingShoppingList, setLoadingShoppingList] = React.useState(false);

  // drag state
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [dragPreview, setDragPreview] = React.useState<RecipeType | null>(null);

  const onSendShoppingList = async () => {
    setLoadingShoppingList(true);
    await handleSendToShoppingList(() => {
      setLoadingShoppingList(false);
    });
  };

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
    setIsDragging(true);
  }

  async function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    setActiveId(null);
    setDragPreview(null);
    if (!over) return;
    setIsDragging(false);

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
            disabled={isLoadingShoppingList}
            onClick={onSendShoppingList}
            startIcon={
              isLoadingShoppingList ? (
                <CircularProgress size={24} />
              ) : (
                <ShoppingCartRoundedIcon />
              )
            }
            sx={{ textTransform: 'none', fontWeight: 800 }}
          >
            Send to Shopping List
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
        <Box sx={{ px: 2 }}>
          <Grid
            container
            spacing={1}
            sx={{
              mb: '300px',
              // compact rows that fit in one screen (adjust heights if needed)
              height: { xs: 'calc(100vh - 100px)', md: 'calc(100vh - 120px)' },
            }}
          >
            {days.map((day, dIdx) => (
              <Grid key={day.key} size={{ xs: 12 }}>
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
                    <Grid size={{ xs: 2, sm: 1.2, md: 1 }}>
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
                          size={{
                            xs: 10 / 3,
                            sm: 11 / 3,
                            md: 11 / 3,
                          }}
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

        <RecipeListSelector
          isDragging={isDragging}
          openDrawer={openDrawer}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          recipes={recipes}
          handleCardClick={handleCardClick}
          setOpenDrawer={setOpenDrawer}
        />
      </DndContext>

      {/* Detail dialog */}
      <RecipeDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        recipeData={recipe}
      >
        <DialogActions>
          <Button variant="contained" onClick={handleDialogClose}>
            Close
          </Button>
        </DialogActions>
      </RecipeDialog>
    </>
  );
}
