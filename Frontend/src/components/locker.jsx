import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
  Typography,
  Collapse
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const lockers = [
  { id: 'CASILLERO 1', owner: 'CORREO EJEMPLO', status: 'CONECTADO' },
  { id: 'CASILLERO 2', owner: 'CORREO EJEMPLO', status: 'CONECTADO' },
  { id: 'CASILLERO 3', owner: 'CORREO EJEMPLO', status: 'CONECTADO' },
];

const ControllerRow = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <TableRow sx={{ bgcolor: '#FFF8E1' }}>
        <TableCell padding="none" sx={{ width: '48px' }}>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell colSpan={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            CONTROLADOR 1
          </Typography>
        </TableCell>
      </TableRow>
      
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2 }}>
              <TableContainer component={Paper} elevation={0} sx={{ bgcolor: '#FFF8E1' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>NOMBRE</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>DUEÑO</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>ESTADO</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lockers.map((locker) => (
                      <TableRow key={locker.id}>
                        <TableCell>{locker.id}</TableCell>
                        <TableCell>{locker.owner}</TableCell>
                        <TableCell>{locker.status}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              mr: 1,
                              bgcolor: '#FFCDD2',
                              color: 'black',
                              '&:hover': {
                                bgcolor: '#EF9A9A',
                              }
                            }}
                          >
                            PEDIR CLAVE
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              bgcolor: '#FFE0B2',
                              color: 'black',
                              '&:hover': {
                                bgcolor: '#FFCC80',
                              }
                            }}
                          >
                            VER DETALLES
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="contained"
                size="small"
                sx={{
                  mt: 2,
                  bgcolor: '#FFE0B2',
                  color: 'black',
                  '&:hover': {
                    bgcolor: '#FFCC80',
                  }
                }}
              >
                AÑADIR NUEVO CASILLERO
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const LockerTable = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        CASILLEROS
      </Typography>
      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableBody>
            <ControllerRow />
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        size="small"
        sx={{
          mt: 2,
          bgcolor: '#FFE0B2',
          color: 'black',
          '&:hover': {
            bgcolor: '#FFCC80',
          }
        }}
      >
        AÑADIR NUEVO CONTROLADOR
      </Button>
    </Box>
  );
};

export default LockerTable;