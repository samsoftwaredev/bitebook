import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import * as React from 'react';

import spaghetti from '@/public/assets/images/food/spaghetti.jpg';

type HeroProps = {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string; // the colored emphasis line
  subtitle?: string;
  imageSrc?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

export default function Hero({
  eyebrow = 'AI-Powered Recipe Management',
  titleLine1 = 'Your Complete',
  titleLine2 = 'Culinary Companion',
  subtitle = `Discover recipes, plan meals, track spending, and reduce food waste—all in one beautiful app. Cook smarter, save money, and eat healthier.`,
  onPrimaryClick,
  onSecondaryClick,
}: HeroProps) {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 8, sm: 10, md: 12 },
        pb: { xs: 8, sm: 10, md: 14 },
        background: {
          xs:
            theme.palette.mode === 'dark'
              ? `radial-gradient(900px 420px at 70% -10%, rgba(7,51,42,.55) 0%, transparent 60%)`
              : `radial-gradient(1200px 600px at 70% 0%, rgba(230,247,241,.85) 0%, transparent 60%)`,
        },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={{ xs: 6, md: 8 }}
        >
          {/* Left – copy */}
          <Box sx={{ flex: 1, maxWidth: 720 }}>
            <Chip
              icon={<FavoriteRoundedIcon />}
              label={eyebrow}
              color="success"
              variant="outlined"
              sx={{
                mb: 2,
                borderRadius: 999,
                fontWeight: 700,
                px: 1,
                '& .MuiChip-icon': { fontSize: 18 },
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.4rem', sm: '3rem', md: '3.4rem' },
                lineHeight: 1.1,
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              {titleLine1}
              <br />
              <Box component="span" sx={{ color: 'primary.main' }}>
                {titleLine2}
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{ mt: 2.5, color: 'text.secondary', maxWidth: 640 }}
            >
              {subtitle}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={onPrimaryClick}
                sx={{
                  borderRadius: 999,
                  px: 2.5,
                  boxShadow: '0 8px 20px rgba(15,183,122,.22)',
                }}
              >
                Get Started Free
              </Button>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={onSecondaryClick}
                sx={{
                  borderRadius: 999,
                  px: 2.5,
                  color: 'text.primary',
                }}
              >
                See Meal Planner
              </Button>
            </Stack>

            <Stack direction="row" spacing={3} sx={{ mt: 3 }}>
              <Stack direction="row" spacing={1.2} alignItems="center">
                <CheckCircleRoundedIcon fontSize="small" color="success" />
                <Typography variant="body2" color="text.secondary">
                  No credit card required
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.2} alignItems="center">
                <CheckCircleRoundedIcon fontSize="small" color="success" />
                <Typography variant="body2" color="text.secondary">
                  Free forever
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Right – image with badges */}
          <Box sx={{ flex: 1, width: '100%' }}>
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 16px 44px rgba(2,33,25,.12)',
              }}
            >
              <Image
                style={{
                  gridArea: 'image',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '20px',
                }}
                src={spaghetti}
                alt="Bowl of spaghetti with tomato sauce and garnished with herbs"
              />
              {/* <CardMedia
                component={Image}
                src={spaghetti}
                alt="Bowl of tomato soup garnished with herbs"
                sx={{
                  display: 'block',
                  width: '100%',
                  height: { xs: 320, sm: 420, md: 460 },
                  objectFit: 'cover',
                }}
              /> */}

              {/* Top-right badge: 10K+ Happy Users */}
              <Paper
                elevation={0}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  borderRadius: 3,
                  px: 2,
                  py: 1.25,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  boxShadow: '0 10px 28px rgba(0,0,0,.14)',
                  bgcolor: 'background.paper',
                }}
              >
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: 'info.main',
                    color: '#fff',
                  }}
                >
                  <Person2RoundedIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
                    10K+
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Happy Users
                  </Typography>
                </Box>
              </Paper>

              {/* Bottom-left badge: 500+ Recipes */}
              <Paper
                elevation={0}
                sx={{
                  position: 'absolute',
                  left: 16,
                  bottom: 16,
                  borderRadius: 3,
                  px: 2,
                  py: 1.25,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  boxShadow: '0 10px 28px rgba(0,0,0,.14)',
                  bgcolor: 'background.paper',
                }}
              >
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: 'primary.light',
                    color: 'primary.dark',
                  }}
                >
                  <FavoriteRoundedIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
                    500+
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Recipes
                  </Typography>
                </Box>
              </Paper>
            </Paper>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
