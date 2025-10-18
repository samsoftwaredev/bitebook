import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  alpha,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { useUserContext } from '@/context/UserContext';

const drawerWidth = 260;

export default function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const { logout } = useUserContext();
  const router = useRouter();
  const upgradeToPremium = () => {
    router.push('/app/pricing');
  };
  const pathname = router.pathname;

  const menu = [
    {
      icon: <HomeRoundedIcon />,
      label: 'Discover Recipes',
      href: '/app',
    },
    {
      icon: <FavoriteRoundedIcon />,
      label: 'My Favorites',
      href: '/app/favorites',
    },
    {
      icon: <EventNoteRoundedIcon />,
      label: 'Meal Planner',
      href: '/app/planner',
    },
    {
      icon: <ShoppingCartRoundedIcon />,
      label: 'Shopping List',
      href: '/app/shopping-list',
    },
    {
      icon: <AssessmentRoundedIcon />,
      label: 'Spending Tracker',
      href: '/app/spending-tracker',
    },
  ];

  const content = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* brand */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            color: '#fff',
            width: 36,
            height: 36,
            fontWeight: 800,
          }}
        >
          R
        </Avatar>
        <Box>
          <Typography fontWeight={800}>RecipeBox</Typography>
          <Typography variant="caption" color="text.secondary">
            Your culinary companion
          </Typography>
        </Box>
      </Box>
      <Divider />

      <List sx={{ p: 1 }}>
        {menu.map((m) => {
          const active = pathname === m.href;
          return (
            <Link href={m.href} passHref key={m.label}>
              <ListItemButton
                key={m.label}
                sx={(t) => ({
                  mb: 0.5,
                  borderRadius: 2,
                  color: t.palette.primary.dark,
                  ...(active && {
                    bgcolor: alpha(t.palette.primary.light, 0.35),
                    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                      color: t.palette.primary.dark,
                      fontWeight: 700,
                    },
                  }),
                })}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{m.icon}</ListItemIcon>
                <ListItemText primary={m.label} />
              </ListItemButton>
            </Link>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* Upgrade card */}
      <Button
        onClick={upgradeToPremium}
        startIcon={<WorkspacePremiumRoundedIcon />}
        sx={{
          m: 2,
          py: 1.2,
          justifyContent: 'flex-start',
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 800,
          color: '#fff',
          background: 'linear-gradient(180deg, #0FB77A 0%, #0A7F56 100%)',
          boxShadow: '0 10px 24px rgba(0,0,0,.18)',
          '&:hover': { filter: 'brightness(.98)' },
        }}
      >
        Upgrade to Premium
      </Button>

      <List sx={{ px: 1, pb: 2 }}>
        <ListItemButton sx={{ borderRadius: 2 }} onClick={logout}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <LogoutRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile temporary drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {content}
      </Drawer>

      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: (t) =>
              `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
          },
        }}
        open
      >
        {content}
      </Drawer>
    </>
  );
}
