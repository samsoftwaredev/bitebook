'use client';

import { ThemeProvider } from '@mui/material/styles';

import { theme } from '@/styles/mui-overwrite';

interface Props {
  children: React.ReactNode;
}

export default function ThemeRegistry({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
