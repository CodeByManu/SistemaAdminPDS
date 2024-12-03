import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Box,
  Button,
  Typography,
} from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const CreateLockerModal = ({ open, onClose, controllerId }) => {
  const [lockerData, setLockerData] = useState({
    nombre: '',
    owner_email: '',
    locker_controller_id: controllerId,
  });

  const handleChange = (e) => {
    setLockerData({
      ...lockerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateLocker = async () => {
    try {
      const newLockerData = {
        nombre: lockerData.nombre,
        owner_email: lockerData.owner_email,
        locker_controller_id: controllerId,
      };

      // Utilizar el ID del controlador especificado
      const response = await axios.post(
        `http://localhost:3000/locker_controllers/${controllerId}/lockers`,
        newLockerData
      );

      alert('Casillero creado exitosamente!');
      onClose();
    } catch (error) {
      console.error('Error creating locker:', error);
      alert('Hubo un error al crear el casillero.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ bgcolor: '#FFF8E1', p: 0 }}>
        <Box sx={{ position: 'relative', p: 3 }}>
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: '#FFE0B2', '&:hover': { bgcolor: '#FFCC80' } }}
          >
            <CloseIcon />
          </IconButton>

          <DialogTitle>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Crear Casillero
            </Typography>
          </DialogTitle>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Nombre del Casillero"
              name="nombre"
              value={lockerData.nombre}
              onChange={handleChange}
              required
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Email del Dueño"
              name="owner_email"
              value={lockerData.owner_email}
              onChange={handleChange}
              required
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#C8E6C9',
              color: 'black',
              mt: 2,
              '&:hover': { bgcolor: '#A5D6A7' },
            }}
            onClick={handleCreateLocker}
          >
            Crear Casillero
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLockerModal;
