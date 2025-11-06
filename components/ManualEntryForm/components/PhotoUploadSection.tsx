import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import React from 'react';

interface PhotoUploadSectionProps {
  photoPreview: string | null;
  onPhotoSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedPhoto: File | null;
}

const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({
  photoPreview,
  onPhotoSelect,
  selectedPhoto,
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        border: 2,
        borderStyle: 'dashed',
        borderColor: selectedPhoto ? 'primary.main' : 'grey.300',
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: selectedPhoto ? 'primary.50' : 'grey.50',
        transition: 'all 0.3s ease',
      }}
    >
      <CardActionArea
        component="label"
        sx={{
          p: 3,
          minHeight: photoPreview ? 200 : 120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={onPhotoSelect}
          style={{ display: 'none' }}
        />

        {photoPreview ? (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 200,
              borderRadius: 2,
              overflow: 'hidden',
              backgroundImage: `url(${photoPreview})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ) : (
          <>
            <AddPhotoAlternateIcon
              sx={{
                fontSize: { xs: 40, sm: 48 },
                color: 'grey.400',
                mb: 1,
              }}
            />
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
            >
              📸 Upload a photo of your recipe (optional)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Preview appears immediately
            </Typography>
          </>
        )}
      </CardActionArea>
    </Card>
  );
};

export default PhotoUploadSection;
