import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, IconButton, TextField, Typography } from '@mui/material';

// Sortable Step Component
function SortableStep({
  step,
  index,
  onUpdate,
  onDelete,
}: {
  step: string;
  index: number;
  onUpdate: (index: number, value: string) => void;
  onDelete: (index: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `step-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        mb: 2,
        p: 2,
        borderRadius: 2,
        border: 1,
        borderColor: 'grey.200',
        bgcolor: 'background.paper',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'primary.50',
        },
      }}
    >
      <IconButton
        size="small"
        sx={{ mt: 0.5, cursor: 'grab' }}
        {...attributes}
        {...listeners}
      >
        <DragIndicatorIcon fontSize="small" />
      </IconButton>

      <Typography
        variant="body2"
        sx={{
          minWidth: 24,
          height: 24,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          fontWeight: 600,
          mt: 0.5,
        }}
      >
        {index + 1}
      </Typography>

      <TextField
        fullWidth
        multiline
        variant="standard"
        value={step}
        onChange={(e) => onUpdate(index, e.target.value)}
        placeholder={`Step ${index + 1}: Describe this step...`}
        sx={{
          '& .MuiInput-root': {
            '&:before': { display: 'none' },
            '&:after': { display: 'none' },
          },
        }}
      />

      <IconButton
        size="small"
        onClick={() => onDelete(index)}
        sx={{ color: 'error.main', minWidth: 24, height: 24 }}
      >
        ×
      </IconButton>
    </Box>
  );
}

export default SortableStep;
