import { useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import React from 'react';

export default function Droppable({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const { isOver, setNodeRef, active } = useDroppable({
    id,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        transition: 'all 0.2s ease',
        transform: isOver ? 'scale(1.02)' : 'scale(1)',
        opacity: isOver ? 0.9 : 1,
        borderRadius: 1,
        bgcolor: active ? 'primary.light' : 'transparent',
      }}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children, { isOver } as any)
        : children}
    </Box>
  );
}
