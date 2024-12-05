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
import CreateControllerModal from './createcontroller'; // Nuevo modal

const ControllerRow = ({ controller, controller_id }) => {
  const [open, setOpen] = useState(false);
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [selectedController, setSelectedController] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [createLockerModalOpen, setCreateLockerModalOpen] = useState(false);

  const handleRequestCode = async (lockerControllerId, lockerId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/locker_controllers/${lockerControllerId}/lockers/${lockerId}/send_code`
      );
      alert('Código de apertura enviado correctamente!');
    } catch (error) {
      alert('Error enviando el código. Verifica la configuración.');
    }
  };

  const handleToggleLockerState = async (lockerControllerId, locker, index) => {
    try {
      const newState = !locker.abierto;
      await axios.put(
        `http://localhost:3000/locker_controllers/${lockerControllerId}/lockers/${locker.id}`,
        { abierto: newState, servo: index }
      );
      setLockers((prev) =>
        prev.map((l) =>
          l.id === locker.id ? { ...l, abierto: newState } : l
        )
      );
    } catch (error) {
      alert('Hubo un error al cambiar el estado del casillero.');
    }
  };

  useEffect(() => {
    const fetchLockers = async () => {
      if (open) {
        try {
          const response = await axios.get(
            `http://localhost:3000/locker_controllers/${controller.id}/lockers`
          );
          setLockers(response.data);
        } catch {
          alert('Error al cargar los casilleros.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLockers();
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
            {controller.nombre || 'Controlador sin registrar'}
          </Typography>
          {/* Añadir el estado de conexión */}
          <Typography variant="body2" color={controller.conectado ? 'green' : 'red'}>
            {controller.conectado ? 'Conectado' : 'Desconectado'}
          </Typography>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2 }}>
              {controller.id ? (
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
                          <TableCell colSpan={4} align="center">
                            Cargando casilleros...
                          </TableCell>
                        </TableRow>
                      ) : (
                        lockers.map((locker, index) => (
                          <TableRow key={locker.id}>
                            <TableCell>{locker.nombre}</TableCell>
                            <TableCell>{locker.owner_email}</TableCell>
                            <TableCell>{locker.abierto ? 'Abierto' : 'Cerrado'}</TableCell>
                            <TableCell align="right">
                              <Button
                                variant="contained"
                                size="small"
                                sx={{ mr: 1, bgcolor: '#FFCDD2', color: 'black' }}
                                onClick={() =>
                                  handleRequestCode(controller.id, locker.id)
                                }
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
                              <Button
                                variant="contained"
                                size="small"
                                sx={{
                                  bgcolor: locker.abierto
                                    ? '#81C784'
                                    : '#E57373',
                                  color: 'black',
                                  width: '72px',
                                }}
                                onClick={() =>
                                  handleToggleLockerState(controller.id, locker, index + 1)
                                }
                              >
                                {locker.abierto ? 'Cerrar' : 'Abrir'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>
                  Este controlador no está registrado. Añádelo manualmente.
                </Typography>
              )}
              <Button
                variant="contained"
                size="small"
                sx={{ mt: 2, bgcolor: '#FFE0B2', color: 'black' }}
                onClick={() => {
                    setCreateLockerModalOpen(true)
                    setSelectedController(controller.id)
                  }
                  }
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
        controllerId={selectedController}
      />
    </>
  );
};

const LockerTable = () => {
  const [lockerControllers, setLockerControllers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createLockerModalOpen, setCreateLockerModalOpen] = useState(false);
  const [createControllerModalOpen, setCreateControllerModalOpen] = useState(false); // Estado para el modal de creación de controladores

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

  const handleControllerCreated = (newController) => {
    setLockerControllers((prev) => [...prev, newController]);
  };

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
                controller_id={controller.id}
              />
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
        onClick={() => setCreateControllerModalOpen(true)}
      >
        AÑADIR NUEVO CONTROLADOR
      </Button>
      <CreateControllerModal
        open={createControllerModalOpen}
        onClose={() => setCreateControllerModalOpen(false)}
        onControllerCreated={handleControllerCreated}
      />
    </Box>
  );
};

export default LockerTable;
