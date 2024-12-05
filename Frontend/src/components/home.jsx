import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  Grid, 
  Chip,
  CircularProgress,
  Container
} from '@mui/material';
import axios from 'axios';
import API_URL from './env';

const weekDays = [
  { day: 'LUNES', value: 1, color: '#FFF8E1' },
  { day: 'MARTES', value: 6, color: '#FFF8E1' },
  { day: 'MIÉRCOLES', value: 3, color: '#FFF8E1' },
  { day: 'JUEVES', value: 1, color: '#FFF8E1' },
  { day: 'VIERNES', value: 3, color: '#FFF8E1' },
  { day: 'SÁBADO', value: 4, color: '#FFF8E1' },
  { day: 'DOMINGO', value: 3, color: '#FFF8E1' },
];

const LockerDashboard = () => {
  const [lockerControllers, setLockerControllers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/locker_controllers`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        }
      }
    )
      .then(async (response) => {
        const controllers = response.data;
        const controllersWithLockers = await Promise.all(controllers.map(async (controller) => {
          try {
            const lockersResponse = await axios.get(`${API_URL}/locker_controllers/${controller.id}/lockers`,
              {
                headers: {
                  "ngrok-skip-browser-warning": true,
                }
              }
            );
            return { ...controller, lockers: lockersResponse.data };
          } catch (error) {
            console.error('Error fetching lockers for controller', controller.id);
            return { ...controller, lockers: [] };
          }
        }));
        setLockerControllers(controllersWithLockers);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching locker controllers:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
      >
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ p: 3 }}>
      <Box sx={{ 
        py: 4, 
        background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        borderRadius: 2,
        mb: 3,
        textAlign: 'center'
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'white',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          DASHBOARD DE USUARIO
        </Typography>
      </Box>

      <Box 
        sx={{ 
            py: 2, 
            bgcolor: '#FF6F61', // Color sólido para el fondo del cuadro
            borderRadius: 1, // Borde redondeado más pequeño
            mb: 3, 
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Sombra más sutil
            border: '2px solid #FF6F61', // Borde sólido
            padding: '10px', // Espacio dentro del cuadro más pequeño
        }}
        >
        <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
            fontWeight: 'bold', 
            color: 'white', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)' 
            }}
        >
            CASILLEROS ABIERTOS EN LA ÚLTIMA SEMANA
        </Typography>
        </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {weekDays.map(({ day, value, color }) => (
          <Grid item xs={12} sm={6} md={1.71} key={day}>
            <Box sx={{ 
              textAlign: 'center', 
              bgcolor: color, 
              p: 2, 
              borderRadius: 2,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }
            }}>
              <Typography sx={{ 
                fontWeight: 'bold', 
                fontSize: '0.875rem', 
                color: '#333' 
              }}>
                {day}
              </Typography>
              <Typography sx={{ 
                mt: 1, 
                fontWeight: 'bold', 
                color: '#2C3E50' 
              }}>
                {value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {lockerControllers.length > 0 ? (
        <Grid container spacing={4}>
          {lockerControllers.map((controller) => (
            <Grid item xs={12} key={controller.id}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <CardHeader
                  title={`Controlador: ${controller.nombre}`}
                  titleTypographyProps={{
                    variant: 'h6',
                    sx: { 
                      fontWeight: 'bold', 
                      color: '#333' 
                    },
                  }}
                  sx={{ 
                    bgcolor: '#f0f0f0',
                    borderBottom: '1px solid #e0e0e0'
                  }}
                />
                <CardContent sx={{ 
                  flexGrow: 1, 
                  overflowY: 'auto',
                  maxHeight: 300
                }}>
                  {controller.lockers.length > 0 ? (
                    <Grid container spacing={2}>
                      {controller.lockers.map((locker) => (
                        <Grid item xs={12} sm={6} md={4} key={locker.id}>
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              bgcolor: locker.abierto ? '#e8f5e9' : '#ffebee',
                              p: 2,
                              borderRadius: 2,
                              mb: 1
                            }}
                          >
                            <Typography 
                              variant="body1" 
                              sx={{ fontWeight: 'bold', mr: 2 }}
                            >
                              {locker.nombre}
                            </Typography>
                            <Chip 
                              label={locker.abierto ? 'Abierto' : 'Cerrado'}
                              color={locker.abierto ? 'success' : 'error'}
                              size="small"
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ textAlign: 'center', py: 2 }}
                    >
                      No hay casilleros disponibles
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          height="50vh"
        >
          <Typography 
            variant="h6" 
            color="text.secondary"
          >
            No hay controladores disponibles
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default LockerDashboard;