import { Box, Typography } from '@mui/material';

import Logo from '../Logo';

interface Props {
  text: string;
  isPage?: boolean;
}

const ErrorPage = ({ text, isPage = false }: Props) => {
  if (isPage === false) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h2" my={2}>
          Error
        </Typography>
        <Typography my={2}>{text}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box>
        <Logo type="logo" />
        <Typography my={2}>{text}</Typography>
      </Box>
    </Box>
  );
};

export default ErrorPage;
