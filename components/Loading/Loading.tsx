import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { keyframes, styled } from '@mui/system';

interface Props {
  isFeature?: boolean;
  size?: number; // overall size in px
  color?: string; // optional override (defaults to theme.primary.main)
  label?: string; // accessible label text under the loader
}

const steamFloat = keyframes`
  0%   { opacity: 0; transform: translateY(6px) scale(0.9); }
  40%  { opacity: .9; }
  100% { opacity: 0; transform: translateY(-16px) scale(1.1); }
`;

const bubbleUp = keyframes`
  0%   { transform: translateY(6px) scale(0.8); opacity: 0; }
  20%  { opacity: .9; }
  100% { transform: translateY(-8px) scale(1); opacity: 0; }
`;

const stir = keyframes`
  0%   { transform: rotate(-6deg); }
  50%  { transform: rotate(6deg); }
  100% { transform: rotate(-6deg); }
`;

// Styled components for animations
const SteamPath = styled('path')(({ theme }) => ({
  animation: `${steamFloat} 1500ms ease-in-out infinite`,
}));

const SteamPath2 = styled('path')(({ theme }) => ({
  animation: `${steamFloat} 1600ms 120ms ease-in-out infinite`,
}));

const SteamPath3 = styled('path')(({ theme }) => ({
  animation: `${steamFloat} 1700ms 240ms ease-in-out infinite`,
}));

const StirGroup = styled('g')(({ theme }) => ({
  transformOrigin: '95px 44px',
  animation: `${stir} 1800ms ease-in-out infinite`,
}));

const Bubble1 = styled('circle')(({ theme }) => ({
  animation: `${bubbleUp} 1100ms ease-in-out infinite`,
}));

const Bubble2 = styled('circle')(({ theme }) => ({
  animation: `${bubbleUp} 1200ms 120ms ease-in-out infinite`,
}));

const Bubble3 = styled('circle')(({ theme }) => ({
  animation: `${bubbleUp} 1100ms 240ms ease-in-out infinite`,
}));

const Loading = ({
  isFeature = false,
  size = 120,
  color,
  label = 'Cooking up something tasty…',
}: Props) => {
  const theme = useTheme();
  const ink = color ?? theme.palette.primary.main;
  const pot = theme.palette.mode === 'dark' ? '#1F2A25' : '#E8F4EF';
  const rim = theme.palette.mode === 'dark' ? '#9FE3C8' : '#0FB77A';
  if (isFeature) {
    return (
      <Box>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        role="status"
        aria-live="polite"
        aria-label={label}
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: ink,
          // reduce motion support
          '@media (prefers-reduced-motion: reduce)': {
            '*': { animation: 'none !important' },
          },
        }}
      >
        <Box
          component="svg"
          width={size}
          height={(size * 5) / 6}
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* steam */}
          <g
            stroke={ink}
            strokeWidth="2"
            strokeLinecap="round"
            opacity={0.8}
            style={{ transformOrigin: '60px 30px' }}
          >
            <SteamPath d="M40 34c-4-6 4-8 0-14" fill="none" stroke={ink} />
            <SteamPath2 d="M60 32c-4-6 4-8 0-14" fill="none" stroke={ink} />
            <SteamPath3 d="M80 34c-4-6 4-8 0-14" fill="none" stroke={ink} />
          </g>

          {/* spoon (stirs) */}
          <StirGroup>
            <rect
              x="93"
              y="18"
              width="4"
              height="36"
              rx="2"
              fill={ink}
              opacity={0.9}
            />
            <circle cx="95" cy="16" r="6" fill={ink} />
          </StirGroup>

          {/* pot body */}
          <g>
            {/* soup surface */}
            <rect x="22" y="42" width="76" height="8" rx="4" fill={rim} />
            {/* pot */}
            <rect x="18" y="46" width="84" height="28" rx="6" fill={pot} />
            {/* rim highlight */}
            <rect
              x="18"
              y="46"
              width="84"
              height="4"
              rx="2"
              fill={ink}
              opacity={0.08}
            />
            {/* handles */}
            <rect x="8" y="50" width="8" height="18" rx="3" fill={pot} />
            <rect x="104" y="50" width="8" height="18" rx="3" fill={pot} />
            {/* feet */}
            <rect
              x="26"
              y="74"
              width="10"
              height="6"
              rx="2"
              fill={ink}
              opacity={0.15}
            />
            <rect
              x="84"
              y="74"
              width="10"
              height="6"
              rx="2"
              fill={ink}
              opacity={0.15}
            />
          </g>

          {/* bubbles (loop with stagger) */}
          <g fill={ink}>
            <Bubble1 cx="45" cy="48" r="2.5" fill={ink} />
            <Bubble2 cx="60" cy="49" r="2" fill={ink} />
            <Bubble3 cx="75" cy="48" r="2.5" fill={ink} />
          </g>

          {/* safe shadow */}
          <ellipse cx="60" cy="92" rx="32" ry="6" fill={ink} opacity={0.08} />
        </Box>

        {/* label */}
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: theme.palette.text.secondary,
            textAlign: 'center',
            maxWidth: size * 1.2,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

export default Loading;
