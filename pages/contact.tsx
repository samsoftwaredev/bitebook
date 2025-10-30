import { Box, Container, Typography } from '@mui/material';
import type { NextPage } from 'next';

import { Meta } from '@/components';

const Contact: NextPage = () => {
  return (
    <>
      <Meta pageTitle="Contact Us" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Get in touch with our team
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Contact;
