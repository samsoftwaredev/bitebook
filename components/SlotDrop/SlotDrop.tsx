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
  useTheme,
} from '@mui/material';
import * as React from 'react';

import { Recipe } from '../RecipeCard/RecipeCard.model';

export default function SlotDrop({
  active,
  assigned,
  label,
  emoji,
  onView,
}: {
  active?: boolean;
  assigned: Recipe | null;
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
