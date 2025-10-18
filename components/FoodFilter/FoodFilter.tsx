import {
  Box,
  Chip,
  Stack,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { foodTypeFilters } from '@/constants/global';
import { FoodTypeFilter } from '@/interfaces/index';
import { mealTypesService } from '@/services/index';

interface FilterChipsProps {
  activeFilter: string;
  handleChip: (label: string) => void;
}

export default function FoodFilter({
  activeFilter,
  handleChip,
}: FilterChipsProps) {
  const [mealTypes, setMealTypes] = React.useState<FoodTypeFilter[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Drag scrolling state
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, scrollLeft: 0 });
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setDragStart({
      x: e.pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft,
    });

    // Add temporary cursor style
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragStart.x) * 2; // Adjust scroll speed
    scrollContainerRef.current.scrollLeft = dragStart.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  };

  // Prevent click events when dragging
  const handleChipClick = (label: string, e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
    handleChip(label);
  };

  React.useEffect(() => {
    // Cleanup on unmount
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, []);

  const getMealTypes = React.useCallback(async () => {
    const { data, error } = await mealTypesService();
    if (error) {
      console.error('Error fetching meal types:', error);
      toast.error('Failed to load meal types.');
    } else {
      // map foodTypeFilters to only those in data.meal_types
      const filteredMealTypes = foodTypeFilters.filter((filter) =>
        data?.meal_type?.includes(filter.value),
      );
      setMealTypes(filteredMealTypes);
    }
  }, []);

  useEffect(() => {
    getMealTypes();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        position: { xs: 'sticky', sm: 'static' },
        top: { xs: 8, sm: 'auto' },
        zIndex: 10,
        backgroundColor: {
          xs: alpha(theme.palette.background.default, 0.95),
          sm: 'transparent',
        },
        backdropFilter: { xs: 'blur(8px)', sm: 'none' },
        pb: { xs: 1, sm: 0 },
        mb: { xs: 1.5, sm: 2.5 },
        mx: { xs: -2, sm: 0 }, // Negative margin on mobile to extend full width
        px: { xs: 2, sm: 0 },
      }}
    >
      <Stack
        ref={scrollContainerRef}
        direction="row"
        spacing={{ xs: 0.75, sm: 1 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          py: { xs: 0.75, sm: 0.5 },
          px: { xs: 0.5, sm: 0 },
          // Enhanced scrolling for mobile
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          scrollSnapType: isDragging ? 'none' : 'x mandatory',
          // Hide scrollbar but keep functionality
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          // Improved scroll indicators
          maskImage: {
            xs: 'linear-gradient(90deg, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)',
            sm: 'linear-gradient(90deg, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
          },
          // Touch scrolling optimization
          WebkitOverflowScrolling: 'touch',
          // Drag scrolling styles
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          // Prevent text selection during drag
          '&:active': {
            cursor: 'grabbing',
          },
        }}
      >
        <Chip
          key="All"
          label="All"
          onClick={(e) => handleChipClick('All', e)}
          color={activeFilter === 'All' ? 'success' : 'default'}
          variant={activeFilter === 'All' ? 'filled' : 'outlined'}
          sx={{
            borderRadius: 999,
            fontWeight: activeFilter === 'All' ? 800 : 600,
            backgroundColor:
              activeFilter === 'All' ? alpha('#0FB77A', 0.18) : undefined,
            px: { xs: 1, sm: 0.5 },
            minHeight: { xs: 32, sm: 34 },
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            flexShrink: 0,
            scrollSnapAlign: 'start',
            // Enhanced touch targets for mobile
            minWidth: { xs: 'fit-content', sm: 'auto' },
            '& .MuiChip-label': {
              px: { xs: 0.75, sm: 1 },
            },
          }}
          clickable
        />

        {mealTypes.map((f) => (
          <Chip
            key={f.label}
            label={f.label}
            onClick={(e) => handleChipClick(f.label, e)}
            color={activeFilter === f.label ? 'success' : 'default'}
            variant={activeFilter === f.label ? 'filled' : 'outlined'}
            icon={
              <span
                aria-hidden
                style={{
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  lineHeight: 1,
                }}
              >
                {f.icon}
              </span>
            }
            sx={{
              borderRadius: 999,
              fontWeight: activeFilter === f.label ? 800 : 600,
              backgroundColor:
                activeFilter === f.label ? alpha('#0FB77A', 0.18) : undefined,
              px: { xs: 1, sm: 0.5 },
              minHeight: { xs: 32, sm: 34 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              flexShrink: 0,
              scrollSnapAlign: 'start',
              // Enhanced touch targets for mobile
              minWidth: { xs: 'fit-content', sm: 'auto' },
              '& .MuiChip-label': {
                px: { xs: 0.75, sm: 1 },
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              },
              '& .MuiChip-icon': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
                marginLeft: { xs: 0.5, sm: 0.75 },
                marginRight: { xs: -0.25, sm: -0.5 },
              },
              // Smooth interaction feedback
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: { xs: 'none', sm: 'translateY(-1px)' },
                boxShadow: { xs: 'none', sm: '0 2px 8px rgba(0,0,0,0.1)' },
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
            clickable
          />
        ))}

        {activeFilter !== 'All' && (
          <Chip
            label="Clear"
            onClick={(e) => handleChipClick('All', e)}
            variant="outlined"
            sx={{
              borderRadius: 999,
              minHeight: { xs: 32, sm: 34 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              px: { xs: 1, sm: 0.5 },
              flexShrink: 0,
              scrollSnapAlign: 'start',
              minWidth: { xs: 'fit-content', sm: 'auto' },
              color: 'error.main',
              borderColor: 'error.main',
              '&:hover': {
                backgroundColor: alpha(theme.palette.error.main, 0.04),
                transform: { xs: 'none', sm: 'translateY(-1px)' },
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
              '& .MuiChip-label': {
                px: { xs: 0.75, sm: 1 },
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              },
            }}
            clickable
          />
        )}
      </Stack>
    </Box>
  );
}
