import { Favorite } from '@mui/icons-material';
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
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import ScorePill from '@/components/ScorePill';
import { favoritesToggleService } from '@/services/index';

import { Recipe } from './RecipeCard.model';

export default function RecipeCard({
  r,
  handleCardClick,
}: {
  r: Recipe;
  handleCardClick: (r: Recipe) => void;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking favorite
    try {
      await favoritesToggleService({ recipeId: r.id, favorite: !isFavorite });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorite status.');
    }
  };

  const handleCardClickWrapper = () => handleCardClick(r);

  return (
    <>
      <Card
        onClick={handleCardClickWrapper}
        sx={{
          borderRadius: 1,
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(2,33,25,.10)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateY(0px)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(2,33,25,.15)',
            '& .card-media': {
              transform: 'scale(1.05)',
            },
            '& .card-content': {
              bgcolor: alpha('#0FB77A', 0.02),
            },
          },
          '&:active': {
            transform: 'translateY(-4px)',
          },
        }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={r.img}
            alt={r.title}
            className="card-media"
            sx={{
              height: 220,
              objectFit: 'cover',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <IconButton
            onClick={handleFavoriteClick}
            size="small"
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.1)',
              },
              boxShadow: '0 8px 20px rgba(0,0,0,.18)',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {isFavorite ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorderRoundedIcon />
            )}
          </IconButton>
          <ScorePill score={r.score} />
        </Box>
        <CardContent
          className="card-content"
          sx={{
            pb: 1.5,
            transition: 'background-color 0.3s ease-in-out',
          }}
        >
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
                sx={{
                  textTransform: 'lowercase',
                  bgcolor: alpha('#000', 0.06),
                }}
              />
            ))}
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mt: 1.25 }}
          >
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
    </>
  );
}
