import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import API_URL from './env';

const CreateControllerModal = ({ open, onClose, onControllerCreated }) => {
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/locker_controllers`, 
        {
          locker_controller: { 
            nombre: nombre, 
            estado: estado,
            user_id: 1,
          },
        },
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          }
        }
      );
      onControllerCreated(response.data);
      onClose();
    } catch (error) {
      console.error('Error al crear controlador:', error);
      alert('No se pudo crear el controlador.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Añadir Nuevo Controlador</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          fullWidth
          margin="dense"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          label="Estado"
          fullWidth
          margin="dense"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateControllerModal;
