import { useState } from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface Image {
  id: number;
  src: string;
  height: number;
  title: string;
  description: string;
}

const images: Image[] = [
  { id: 1, src: 'https://picsum.photos/400/300?random=1', height: 300, title: 'Proyecto 1', description: 'Diseño de interfaz moderna para aplicación móvil' },
  { id: 2, src: 'https://picsum.photos/400/500?random=2', height: 500, title: 'Proyecto 2', description: 'Branding completo para empresa de tecnología' },
  { id: 3, src: 'https://picsum.photos/400/250?random=3', height: 250, title: 'Proyecto 3', description: 'Ilustraciones digitales para campaña publicitaria' },
  { id: 4, src: 'https://picsum.photos/400/400?random=4', height: 400, title: 'Proyecto 4', description: 'Diseño web responsive con animaciones' },
  { id: 5, src: 'https://picsum.photos/400/350?random=5', height: 350, title: 'Proyecto 5', description: 'Desarrollo de identidad visual corporativa' },
  { id: 6, src: 'https://picsum.photos/400/450?random=6', height: 450, title: 'Proyecto 6', description: 'Fotografía y edición para portafolio profesional' },
  { id: 7, src: 'https://picsum.photos/400/320?random=7', height: 320, title: 'Proyecto 7', description: 'Diseño de packaging para producto premium' },
  { id: 8, src: 'https://picsum.photos/400/280?random=8', height: 280, title: 'Proyecto 8', description: 'UI/UX para plataforma de e-commerce' },
  { id: 9, src: 'https://picsum.photos/400/380?random=9', height: 380, title: 'Proyecto 9', description: 'Arte digital y composición creativa' },
  { id: 10, src: 'https://picsum.photos/400/420?random=10', height: 420, title: 'Proyecto 10', description: 'Diseño editorial para revista digital' },
];

export default function BasicMasonry() {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const handleOpen = (image: Image) => setSelectedImage(image);
  const handleClose = () => setSelectedImage(null);

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 1200, minHeight: 393 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
          {images.map((image) => (
            <div key={image.id}>
              <img
                src={image.src}
                alt={image.title}
                onClick={() => handleOpen(image)}
                style={{
                  width: '100%',
                  display: 'block',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              />
            </div>
          ))}
        </Masonry>
      </Box>

      <Modal
        open={!!selectedImage}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            outline: 'none',
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: -50,
              right: -10,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
              fontSize: '1.5rem',
              width: '45px',
              height: '45px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              },
            }}
          >
            ✕
          </IconButton>
          {selectedImage && (
            <Card
              sx={{
                maxWidth: '1200px',
                width: '90vw',
                height: { xs: 'auto', md: '450px' },
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                overflow: 'hidden',
                borderRadius: '16px',
              }}
            >
              <Box
                sx={{
                  flex: { xs: '1', md: '0 0 60%' },
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f3f4f6',
                }}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <CardContent 
                sx={{ 
                  flex: '1',
                  backgroundColor: 'white', 
                  padding: { xs: '24px', md: '40px' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'auto',
                }}
              >
                <Typography 
                  variant="h4" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 'bold', 
                    marginBottom: '24px', 
                    color: '#111827',
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                  }}
                >
                  {selectedImage.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#6b7280', 
                    lineHeight: 1.8,
                    fontSize: { xs: '1rem', md: '1.125rem' },
                  }}
                >
                  {selectedImage.description}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Modal>
    </>
  );
}
