import { useDraggable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import React from 'react';

export default function Draggable({
  children,
  id,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        cursor: isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 0.6 : 1,
        transition: isDragging ? 'none' : 'opacity 0.2s ease',
        zIndex: isDragging ? 1000 : 'auto',
        position: 'relative',
      }}
      style={style}
    >
      {children}
    </Box>
  );
}
