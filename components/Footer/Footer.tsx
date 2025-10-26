import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link as MUILink,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import NextLink from 'next/link';

import { Logo } from '@/components';
import { COMPANY, NAV_FOOTER_LINKS, NAV_MAIN_LINKS } from '@/constants';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  // helper to render a nav link with consistent styling
  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <MUILink
      component={NextLink}
      href={href}
      underline="none"
      color="text.secondary"
      variant="body2"
      sx={{
        fontWeight: 600,
        px: 0.5,
        '&:hover': { color: 'success.main', textDecoration: 'underline' },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.success.main}`,
          outlineOffset: 2,
          borderRadius: 1,
        },
      }}
    >
      {children}
    </MUILink>
  );

  return (
    <Box
      component="footer"
      role="contentinfo"
      sx={{
        mt: { xs: 4, md: 6 },
        borderTop: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.success.light, 0.06)
            : '#F7FDFB', // soft mint tint
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        {/* Top row: brand + tagline */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box aria-label={`${COMPANY.name} logo`}>
              <Logo />
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Cook smarter. Save money. Eat healthier.
            </Typography>
          </Stack>

          {/* Social icons */}
          <Stack direction="row" spacing={1} aria-label="Social media">
            <Tooltip title="Facebook">
              <IconButton
                component="a"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                sx={iconButtonSx(theme)}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="YouTube">
              <IconButton
                component="a"
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                sx={iconButtonSx(theme)}
              >
                <YouTubeIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Instagram">
              <IconButton
                component="a"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                sx={iconButtonSx(theme)}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Divider
          sx={{ mb: 2, borderColor: alpha(theme.palette.text.primary, 0.08) }}
        />

        {/* Nav links */}
        <Stack
          component="nav"
          aria-label="Footer"
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2 }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          sx={{ rowGap: 1, mb: 1 }}
        >
          {/* Left group: Company */}
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <NavLink href={NAV_FOOTER_LINKS.about.link}>
              {NAV_FOOTER_LINKS.about.label}
            </NavLink>
            <Separator />
            <NavLink href={NAV_FOOTER_LINKS.resources.link}>
              {NAV_FOOTER_LINKS.resources.label}
            </NavLink>
            <Separator />
            <NavLink href={NAV_FOOTER_LINKS.contact.link}>
              {NAV_FOOTER_LINKS.contact.label}
            </NavLink>
          </Stack>

          {/* Right group: Legal + Account */}
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <NavLink href={NAV_FOOTER_LINKS.termsOfService.link}>
              {NAV_FOOTER_LINKS.termsOfService.label}
            </NavLink>
            <Separator />
            <NavLink href={NAV_FOOTER_LINKS.privacyPolicy.link}>
              {NAV_FOOTER_LINKS.privacyPolicy.label}
            </NavLink>
            <Separator />
            <NavLink href={NAV_MAIN_LINKS.login.link}>
              {NAV_MAIN_LINKS.login.label}
            </NavLink>
          </Stack>
        </Stack>

        {/* Copyright line */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 1 }}
        >
          © {currentYear} {COMPANY.name}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

function iconButtonSx(theme: any) {
  return {
    color: theme.palette.success.main,
    border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
    backgroundColor: alpha(theme.palette.success.main, 0.06),
    '&:hover': {
      backgroundColor: alpha(theme.palette.success.main, 0.14),
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.success.main}`,
      outlineOffset: 2,
    },
  };
}

function Separator() {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: 1,
        height: 16,
        borderRight: (t) => `1px solid ${alpha(t.palette.text.primary, 0.15)}`,
        mx: 0.5,
        display: { xs: 'none', sm: 'inline-block' },
      }}
    />
  );
}

export default Footer;
