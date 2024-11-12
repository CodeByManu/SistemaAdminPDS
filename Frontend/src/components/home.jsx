import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const weekDays = [
  { day: 'LUNES', value: 1 },
  { day: 'MARTES', value: 6 },
  { day: 'MIÉRCOLES', value: 3 },
  { day: 'JUEVES', value: 1 },
  { day: 'VIERNES', value: 3 },
  { day: 'SÁBADO', value: 4 },
  { day: 'DOMINGO', value: 3 }
];

const LockerDashboard = () => {
  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        BIENVENIDO (USUARIO)
      </Typography>
      
      {/* Tabla Semanal */}
      <Paper 
        elevation={0}
        sx={{ 
          bgcolor: '#FFF8E1',
          p: 2,
          mb: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          CASILLEROS ABIERTOS EN LA ÚLTIMA SEMANA
        </Typography>
        <Grid container spacing={2}>
          {weekDays.map(({ day, value }) => (
            <Grid item xs={12/7} key={day}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                  {day}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  {value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card 
            elevation={1}
            sx={{ 
              bgcolor: '#FFF8E1',
              height: '100%'
            }}
          >
            <CardHeader 
              title="ESTADO DE LOS CASILLEROS"
              titleTypographyProps={{ 
                variant: 'h6',
                sx: { fontWeight: 'bold', fontSize: '1rem' }
              }}
            />
            <CardContent sx={{ height: 200 }}>
              {/* Contenido */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            elevation={1}
            sx={{ 
              bgcolor: '#FFF8E1',
              height: '100%'
            }}
          >
            <CardHeader 
              title="CASILLEROS CON MAYOR TIEMPO DE APERTURA"
              titleTypographyProps={{ 
                variant: 'h6',
                sx: { fontWeight: 'bold', fontSize: '1rem' }
              }}
            />
            <CardContent sx={{ height: 200 }}>
              {/* Contenido */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            elevation={1}
            sx={{ 
              bgcolor: '#FFF8E1',
              height: '100%'
            }}
          >
            <CardHeader 
              title="CASILLEROS MAS USADOS (ULTIMOS 7 DIAS)"
              titleTypographyProps={{ 
                variant: 'h6',
                sx: { fontWeight: 'bold', fontSize: '1rem' }
              }}
            />
            <CardContent sx={{ height: 200 }}>
              {/* Contenido */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LockerDashboard;