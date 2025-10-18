import { Box, Divider, Typography } from '@mui/material';

import { useLanguageContext } from '@/context/LanguageContext';

const HorizontalDivider = () => {
  const { t } = useLanguageContext();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
      <Divider sx={{ flex: 1 }} />
      <Typography variant="body2" color="text.secondary">
        {t.or}
      </Typography>
      <Divider sx={{ flex: 1 }} />
    </Box>
  );
};

export default HorizontalDivider;
