import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

import SortableStep from '../../SortableStep';

interface InstructionsSectionProps {
  steps: string[];
  onStepUpdate: (index: number, value: string) => void;
  onStepDelete: (index: number) => void;
  onAddStep: () => void;
  onDragEnd: (event: DragEndEvent) => void;
}

const InstructionsSection = ({
  steps,
  onStepUpdate,
  onStepDelete,
  onAddStep,
  onDragEnd,
}: InstructionsSectionProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 1,
        border: 1,
        borderColor: 'grey.200',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6" fontWeight={600}>
          📋 Instructions
        </Typography>
        <Button size="small" onClick={onAddStep} sx={{ borderRadius: 2 }}>
          + Add Step
        </Button>
      </Stack>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={steps.map((_, i) => `step-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          {steps.map((step, index) => (
            <SortableStep
              key={`step-${index}`}
              step={step}
              index={index}
              onUpdate={onStepUpdate}
              onDelete={onStepDelete}
            />
          ))}
        </SortableContext>
      </DndContext>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 2, fontStyle: 'italic' }}
      >
        💡 Drag steps to reorder them
      </Typography>
    </Paper>
  );
};

export default InstructionsSection;
