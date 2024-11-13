import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LockerDetailsModal from './lockerdetail';
import CreateLockerModal from './createlocker';

const ControllerRow = ({ controller, setCreateLockerModalOpen, createLockerModalOpen }) => {
  const [open, setOpen] = useState(false);
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleRequestCode = async (lockerControllerId, lockerId) => {
    try {
      const response = await axios.post(`http://localhost:3000/locker_controllers/${lockerControllerId}/lockers/${lockerId}/send_code`);
      console.log('Email enviado correctamente:', response.data);
      alert('Código de apertura enviado!');
    } catch (error) {
      console.error('Error enviando el email:', error);
      alert('Hubo un error al eliminar el casillero');
    }
  };

  useEffect(() => {
    const fetchLockers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/locker_controllers/${controller.id}/lockers`);
        setLockers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lockers:', error);
        setLoading(false);
      }
    };

    if (open) {
      fetchLockers();
    }
  }, [open, controller.id]);

  return (
    <>
      <TableRow sx={{ bgcolor: '#FFF8E1' }}>
        <TableCell padding="none" sx={{ width: '48px' }}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell colSpan={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {controller.nombre}
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
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center">Loading lockers...</TableCell>
                      </TableRow>
                    ) : (
                      lockers.map((locker) => (
                        <TableRow key={locker.id}>
                          <TableCell>{locker.nombre}</TableCell>
                          <TableCell>{locker.owner_email}</TableCell>
                          <TableCell>{locker.abierto ? 'Abierto' : 'Cerrado'}</TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              size="small"
                              sx={{ mr: 1, bgcolor: '#FFCDD2', color: 'black' }}
                              onClick={() => handleRequestCode(controller.id, locker.id)}
                            >
                              PEDIR CLAVE
                            </Button>
                            <Button 
                              variant="contained" 
                              size="small" 
                              sx={{ bgcolor: '#FFE0B2', color: 'black' }}
                              onClick={() => {
                                setSelectedLocker(locker);
                                setDetailsModalOpen(true);
                              }}
                            >
                              VER DETALLES
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button 
                variant="contained" 
                size="small" 
                sx={{ mt: 2, bgcolor: '#FFE0B2', color: 'black' }}
                onClick={() => setCreateLockerModalOpen(true)}
              >
                AÑADIR NUEVO CASILLERO
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <LockerDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        locker={selectedLocker}
      />

      <CreateLockerModal
        open={createLockerModalOpen}
        onClose={() => setCreateLockerModalOpen(false)}
        controllerId={controller.id}  // Passing the controller ID to the modal
      />
    </>
  );
};

const LockerTable = () => {
  const [lockerControllers, setLockerControllers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createLockerModalOpen, setCreateLockerModalOpen] = useState(false);

  useEffect(() => {
    const fetchLockerControllers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/locker_controllers');
        setLockerControllers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching locker controllers:', error);
        setLoading(false);
      }
    };

    fetchLockerControllers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        CASILLEROS
      </Typography>
      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableBody>
            {lockerControllers.map((controller) => (
              <ControllerRow 
                key={controller.id} 
                controller={controller}
                setCreateLockerModalOpen={setCreateLockerModalOpen}
                createLockerModalOpen={createLockerModalOpen}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Button
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
      </Button> */}
    </Box>
  );
};

export default LockerTable;
