import { Box, alpha } from '@mui/material';

export default function ScorePill({ score }: { score: number }) {
  const color = score >= 80 ? '#16A34A' : score >= 60 ? '#F59E0B' : '#EF4444';
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 12,
        bottom: 12,
        bgcolor: '#fff',
        borderRadius: 999,
        px: 1,
        py: 0.25,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        fontWeight: 700,
        fontSize: 12,
        boxShadow: '0 6px 16px rgba(0,0,0,.18)',
        color,
      }}
    >
      <Box
        sx={{
          width: 16,
          height: 16,
          borderRadius: 999,
          bgcolor: alpha(color, 0.15),
          display: 'inline-block',
        }}
      />
      {score}/100
    </Box>
  );
}
