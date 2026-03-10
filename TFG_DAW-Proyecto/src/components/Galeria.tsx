import { useState, useEffect } from 'react';
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
  categoria: string;
  height: number;
  title: string;
  description: string;
}

const API_URL = 'http://localhost:5047';

interface BasicMasonryProps {
  categoria?: string;
}

export default function BasicMasonry({ categoria }: BasicMasonryProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  // Cargar imágenes de la API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/galeria`);
        if (!response.ok) throw new Error('Error al cargar imágenes');
        const data: Image[] = await response.json();
        
        // Filtrar por categoría si se proporciona
        const filtradas = categoria 
          ? data.filter(img => img.categoria.toLowerCase() === categoria.toLowerCase())
          : data;
        
        setImages(filtradas);
      } catch (err) {
        console.error('Error fetching images:', err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [categoria]);

  const handleOpen = (image: Image) => setSelectedImage(image);
  const handleClose = () => setSelectedImage(null);

  // Construir URL completa de la imagen
  const getImageUrl = (src: string) => {
    // Si ya es una URL completa, devolverla
    if (src.startsWith('http')) return src;
    
    // Si empieza con / o uploads/, añadir el dominio
    if (src.startsWith('/') || src.startsWith('uploads')) {
      return `${API_URL}/${src}`;
    }
    
    // Si es solo el nombre del archivo, construir la ruta completa
    return `${API_URL}/uploads/galeria/${src}`;
  };

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 1200, minHeight: 393 }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', padding: '60px 20px' }}>
            <Typography sx={{ color: '#9ca3af' }}>Cargando galería...</Typography>
          </Box>
        ) : images.length === 0 ? (
          <Box sx={{ textAlign: 'center', padding: '60px 20px' }}>
            <Typography sx={{ color: '#9ca3af' }}>No hay imágenes en la galería</Typography>
          </Box>
        ) : (
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
            {images.map((image) => (
              <div key={image.id}>
                <img
                  src={getImageUrl(image.src)}
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
        )}
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
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                overflow: 'hidden',
                borderRadius: '16px',
              }}
            >
              <Box
                sx={{
                  flex: { xs: '0 0 40vh', md: '0 0 50%' },
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f3f4f6',
                }}
              >
                <img
                  src={getImageUrl(selectedImage.src)}
                  alt={selectedImage.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
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
                  variant="overline"
                  sx={{
                    color: '#6b7280',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    marginBottom: '8px',
                    display: 'block',
                  }}
                >
                  {selectedImage.categoria}
                </Typography>
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
