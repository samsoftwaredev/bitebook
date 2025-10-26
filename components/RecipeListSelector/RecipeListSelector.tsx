import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Box,
  Chip,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
  alpha,
} from '@mui/material';
import React from 'react';

import Draggable from '@/components/Draggable';
import RecipeDraggableCard from '@/components/RecipeDraggableCard';
import { drawerWidth } from '@/constants/index';
import { theme } from '@/styles/mui-overwrite';

import { Recipe } from '../RecipeCard/RecipeCard.model';

interface Props {
  openDrawer: boolean;
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  recipes: Recipe[];
  handleCardClick: (r: Recipe) => void;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  isDragging: boolean;
}

const RecipeListSelector = ({
  openDrawer,
  searchTerm,
  handleSearchChange,
  recipes,
  handleCardClick,
  setOpenDrawer,
  isDragging,
}: Props) => {
  return (
    <Paper
      elevation={8}
      sx={{
        marginLeft: `${drawerWidth}px`,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        px: { xs: 1, sm: 2 },
        pt: 1,
        pb: openDrawer ? 1.5 : 0.5,
        maxHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Drawer header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        display={isDragging ? 'none' : 'flex'}
        spacing={1}
      >
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
        {openDrawer && (
          <>
            <Paper
              sx={{
                width: { xs: '100%', sm: 'auto' },
                p: 0.5,
                px: 1,
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                minWidth: { xs: '100%', sm: 220 },
                bgcolor: alpha(theme.palette.text.primary, 0.06),
              }}
            >
              <SearchRoundedIcon fontSize="small" sx={{ mr: 1 }} />
              <InputBase
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search recipes…"
                sx={{ fontSize: 14, width: '100%' }}
              />
            </Paper>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ px: 2, textAlign: 'center' }}
            >
              Drag and drop recipes to plan your meals.
            </Typography>
          </>
        )}
      </Stack>

      {/* Cards row */}
      {openDrawer && (
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            gap: { xs: 2, sm: 5 },
            overflowX: 'auto',
            pb: 0.5,
            scrollSnapType: 'x mandatory',
            '&::-webkit-scrollbar': { height: 6 },
            flexShrink: 1,
            overflowY: 'hidden',
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
  );
};
export default RecipeListSelector;
