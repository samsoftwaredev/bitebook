import { Container, Typography } from '@mui/material';

import { MainLayout } from '@/components/Templates';

interface Props {
  title?: string;
  description?: string;
  imagePath?: string;
  imageAlt?: string;
}

const PageNotFound = ({
  title = '404',
  description = 'Page Not Found',
  imagePath = '',
  imageAlt = 'Not Found',
}: Props) => {
  return (
    <MainLayout>
      <Container maxWidth={false}>
        {/* <Image src={imagePath} alt={imageAlt} /> */}
        <Typography variant="h1">{title}</Typography>
        <Typography variant="h6">{description}</Typography>
      </Container>
    </MainLayout>
  );
};

export default PageNotFound;
