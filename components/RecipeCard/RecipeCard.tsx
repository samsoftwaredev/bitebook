import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
  alpha,
} from '@mui/material';
import * as React from 'react';

import ScorePill from '@/components/ScorePill';

import { Recipe } from './RecipeCard.model';

export default function RecipeCard({ r }: { r: Recipe }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 12px 30px rgba(2,33,25,.10)',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={r.img}
          alt={r.title}
          sx={{ height: 220, objectFit: 'cover' }}
        />
        <IconButton
          size="small"
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            bgcolor: '#fff',
            '&:hover': { bgcolor: alpha('#fff', 0.9) },
            boxShadow: '0 8px 20px rgba(0,0,0,.18)',
          }}
        >
          <FavoriteBorderRoundedIcon />
        </IconButton>
        <ScorePill score={r.score} />
      </Box>
      <CardContent sx={{ pb: 1.5 }}>
        <Typography fontWeight={800}>{r.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {r.desc}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 1, flexWrap: 'wrap', rowGap: 0.75 }}
        >
          {r.tags.map((t) => (
            <Chip
              key={t}
              size="small"
              label={t}
              sx={{ textTransform: 'lowercase', bgcolor: alpha('#000', 0.06) }}
            />
          ))}
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.25 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeRoundedIcon fontSize="small" />
            <Typography variant="body2">{r.time}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <AttachMoneyRoundedIcon fontSize="small" color="success" />
            <Typography variant="body2" fontWeight={700}>
              {r.price}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
