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

const iconButtonSx = (theme: any) => {
  return {
    color: theme.palette.success.main,
    border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
    backgroundColor: alpha(theme.palette.success.main, 0.06),
    borderRadius: 2,
    width: { xs: 44, md: 40 },
    height: { xs: 44, md: 40 },
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: alpha(theme.palette.success.main, 0.14),
      transform: 'translateY(-1px)',
      borderColor: alpha(theme.palette.success.main, 0.5),
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.success.main}`,
      outlineOffset: 2,
    },
    '&:active': {
      transform: 'translateY(0)',
      backgroundColor: alpha(theme.palette.success.main, 0.2),
    },
  };
};

const Separator = () => {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: 1,
        height: 16,
        mx: 0.5,
        display: { xs: 'none', sm: 'inline-block' },
      }}
    />
  );
};

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
        fontWeight: 500,
        px: 0.5,
        py: { xs: 0.5, md: 0 },
        borderRadius: 1,
        transition: 'all 0.2s ease-in-out',
        fontSize: { xs: '0.875rem', md: '0.875rem' },
        '&:hover': {
          color: 'success.main',
          textDecoration: 'underline',
          backgroundColor: {
            xs: alpha(theme.palette.success.main, 0.04),
            md: 'transparent',
          },
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.success.main}`,
          outlineOffset: 2,
          borderRadius: 1,
        },
        '&:active': {
          backgroundColor: {
            xs: alpha(theme.palette.success.main, 0.08),
            md: 'transparent',
          },
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
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 4, md: 5 }, px: { xs: 2, sm: 3 } }}
      >
        {/* Top row: brand + tagline + social icons */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 3, md: 2 }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          justifyContent="space-between"
          sx={{ mb: { xs: 3, md: 4 }, textAlign: { xs: 'center', md: 'left' } }}
        >
          {/* Brand section */}
          <Stack
            spacing={1.5}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            sx={{ maxWidth: { xs: '100%', md: '400px' } }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box aria-label={`${COMPANY.name} logo`}>
                <Logo />
              </Box>
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                lineHeight: 1.6,
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              Cook smarter. Save money. Eat healthier.
            </Typography>
          </Stack>

          {/* Social icons */}
          <Stack
            direction="row"
            spacing={1.5}
            aria-label="Social media"
            sx={{ mt: { xs: 0, md: 1 } }}
          >
            <Tooltip title="Follow us on Facebook">
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
            <Tooltip title="Subscribe on YouTube">
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
            <Tooltip title="Follow us on Instagram">
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
          sx={{
            mb: { xs: 3, md: 4 },
            borderColor: alpha(theme.palette.text.primary, 0.08),
            mx: { xs: -2, sm: 0 },
          }}
        />

        {/* Navigation links - Mobile first approach */}
        <Stack
          component="nav"
          aria-label="Footer navigation"
          spacing={{ xs: 3, md: 0 }}
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          {/* Mobile: Stacked sections */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            {/* Company links */}
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="text.primary"
              >
                Company
              </Typography>
              <Stack spacing={1.5}>
                <NavLink href={NAV_FOOTER_LINKS.about.link}>
                  {NAV_FOOTER_LINKS.about.label}
                </NavLink>
                <NavLink href={NAV_FOOTER_LINKS.resources.link}>
                  {NAV_FOOTER_LINKS.resources.label}
                </NavLink>
                <NavLink href={NAV_FOOTER_LINKS.contact.link}>
                  {NAV_FOOTER_LINKS.contact.label}
                </NavLink>
              </Stack>
            </Stack>

            {/* Legal links */}
            <Stack spacing={2}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="text.primary"
              >
                Legal & Account
              </Typography>
              <Stack spacing={1.5}>
                <NavLink href={NAV_FOOTER_LINKS.termsOfService.link}>
                  {NAV_FOOTER_LINKS.termsOfService.label}
                </NavLink>
                <NavLink href={NAV_FOOTER_LINKS.privacyPolicy.link}>
                  {NAV_FOOTER_LINKS.privacyPolicy.label}
                </NavLink>
                <NavLink href={NAV_MAIN_LINKS.login.link}>
                  {NAV_MAIN_LINKS.login.label}
                </NavLink>
              </Stack>
            </Stack>
          </Box>

          {/* Desktop: Horizontal layout */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexWrap: 'wrap',
              gap: { md: 2, lg: 3 },
            }}
          >
            {/* Left group: Company */}
            <Stack
              direction="row"
              spacing={2}
              flexWrap="wrap"
              alignItems="center"
            >
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
            <Stack
              direction="row"
              spacing={2}
              flexWrap="wrap"
              alignItems="center"
            >
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
        </Stack>

        {/* Copyright line */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            textAlign: { xs: 'center', md: 'left' },
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            lineHeight: 1.5,
            pt: { xs: 2, md: 1 },
            borderTop: {
              xs: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              md: 'none',
            },
          }}
        >
          © {currentYear} {COMPANY.name}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
