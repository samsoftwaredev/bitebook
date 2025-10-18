import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  alpha,
} from '@mui/material';
import React from 'react';

import { SideNavbar } from '@/components/Navbars';

const drawerWidth = 260;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top app bar (mobile only) */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          display: { xs: 'block', md: 'none' },
          backgroundColor: '#fff',
          color: 'text.primary',
          borderBottom: (t) =>
            `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton edge="start" onClick={() => setMobileOpen(true)}>
            <MenuRoundedIcon />
          </IconButton>
          <Typography fontWeight={800}>Discover</Typography>
        </Toolbar>
      </AppBar>

      <SideNavbar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 2, sm: 3 },
          py: { xs: 10, md: 4 }, // leave space for mobile AppBar
          ml: { md: `${drawerWidth}px` },
          backgroundColor: (t) => alpha(t.palette.text.primary, 0.02),
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="xl" disableGutters>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
