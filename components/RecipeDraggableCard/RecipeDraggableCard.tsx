import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';

import { RecipeType } from '@/interfaces';

export default function RecipeDraggableCard({
  r,
  onView,
}: {
  r: RecipeType;
  onView: (rec: RecipeType) => void;
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
