import { Container, Typography } from '@mui/material';
import Image from 'next/image';

import { MainLayout } from '@/components/Templates';

import styles from './pageNotFound.module.scss';

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
      <Container maxWidth={false} className={styles.container}>
        {/* <Image src={imagePath} alt={imageAlt} /> */}
        <Typography variant="h1">{title}</Typography>
        <Typography variant="h6">{description}</Typography>
      </Container>
    </MainLayout>
  );
};

export default PageNotFound;
