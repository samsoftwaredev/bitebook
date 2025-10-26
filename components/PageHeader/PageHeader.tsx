import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {
  title: string;
  subTitle: string;
  children?: React.ReactNode;
}

const PageHeader = ({ title, subTitle, children = null }: Props) => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      spacing={2}
      sx={{ mb: 2 }}
    >
      <Box>
        <Typography variant="h4" fontWeight={900} letterSpacing="-0.01em">
          {title}
        </Typography>
        <Typography color="text.secondary">{subTitle}</Typography>
      </Box>

      {children}
    </Stack>
  );
};

export default PageHeader;
