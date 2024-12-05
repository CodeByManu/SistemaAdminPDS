import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, Box, Typography, Grid } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import LockOpenIcon from '@mui/icons-material/LockOpen';
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

const MetricCard = ({ title, value, loading, error, icon }) => (
  <Card sx={{ 
    bgcolor: '#FFF8E1', 
    height: '100%', 
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }
  }}>
    <CardHeader 
      title={title} 
      titleTypographyProps={{ 
        variant: 'h6', 
        sx: { 
          fontWeight: 'bold', 
          textTransform: 'uppercase',
          color: '#333'
        } 
      }}
      avatar={React.cloneElement(icon, { 
        sx: { 
          fontSize: 40, 
          color: '#FD9A4F' 
        } 
      })}
    />
    <CardContent 
      sx={{ 
        height: 200, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}
    >
      {loading ? (
        <Typography color="textSecondary">Cargando...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#2C3E50',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)' 
          }}
        >
          {value}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const LockerDashboardSuper = () => {
  const [userCount, setUserCount] = useState(0);
  const [controllerCount, setControllerCount] = useState(0);
  const [activeLockerCount, setActiveLockerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingControllers, setLoadingControllers] = useState(true);
  const [loadingLockers, setLoadingLockers] = useState(true);
  const [error, setError] = useState(null);
  const [errorControllers, setErrorControllers] = useState(null);
  const [errorLockers, setErrorLockers] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/users/count`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        }
      })
      .then((response) => {
        setUserCount(response.data.count);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('No se pudo cargar la cantidad de usuarios');
        setLoading(false);
      });

    axios.get(`${API_URL}/locker_controllers/count`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        }
      })
      .then((response) => {
        setControllerCount(response.data.count);
        setLoadingControllers(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorControllers('No se pudo cargar la cantidad de controladores');
        setLoadingControllers(false);
      });

    axios.get(`${API_URL}/lockers/active_count`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        }
      })
      .then((response) => {
        setActiveLockerCount(response.data.count);
        setLoadingLockers(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorLockers('No se pudo cargar la cantidad de casilleros activos');
        setLoadingLockers(false);
      });
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      <Box sx={{ 
        py: 4, 
        background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', 
        borderRadius: 2, 
        mb: 3, 
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'white', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)' 
          }}
        >
          DASHBOARD DE SUPERUSUARIO
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

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <MetricCard 
            title="CANTIDAD DE USUARIOS" 
            value={userCount} 
            loading={loading} 
            error={error} 
            icon={<GroupIcon />} 
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <MetricCard 
            title="CANTIDAD DE CONTROLADORES" 
            value={controllerCount} 
            loading={loadingControllers} 
            error={errorControllers} 
            icon={<SettingsRemoteIcon />} 
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <MetricCard 
            title="CASILLEROS ACTIVOS" 
            value={activeLockerCount} 
            loading={loadingLockers} 
            error={errorLockers} 
            icon={<LockOpenIcon />} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LockerDashboardSuper;