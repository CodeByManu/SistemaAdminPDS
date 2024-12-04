import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
} from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const LockerDetailsModal = ({ open, onClose, locker }) => {
  if (!locker) return null;

  const [editableEmail, setEditableEmail] = useState(locker.owner_email);

  const handleSendCode = async () => {
    try {
      await axios.post(`http://localhost:3000/locker_controllers/${locker.locker_controller_id}/lockers/${locker.id}/send_code`);
      alert('Código de apertura enviado!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Hubo un error al enviar el código.');
    }
  };

  const handleEmailChange = (event) => {
    setEditableEmail(event.target.value);
  };

  const handleUpdateEmail = async () => {
    try {
      await axios.put(`http://localhost:3000/locker_controllers/${locker.locker_controller_id}/lockers/${locker.id}/update_email`, { email: editableEmail });
      alert('Email actualizado correctamente');
    } catch (error) {
      console.error('Error updating email:', error);
      alert('Hubo un error al actualizar el email');
    }
  };

  const deleteLocker = async () => {
    try {
      await axios.delete(`http://localhost:3000/locker_controllers/${locker.locker_controller_id}/lockers/${locker.id}`);
      alert('El casillero ha sido eliminado correctamente');
      onClose();
    } catch (error) {
      console.error('Error deleting locker:', error);
      alert('Hubo un error al eliminar el casillero');
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

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              {locker.nombre}
            </Typography>
            <Box sx={{ bgcolor: '#C8E6C9', px: 2, py: 0.5, borderRadius: '16px', display: 'inline-block' }}>
              <Typography variant="body2">CONECTADO</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>DUEÑO</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={editableEmail}
              onChange={handleEmailChange}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: '#FFE0B2',
                color: 'black',
                '&:hover': { bgcolor: '#FFCC80' },
              }}
              onClick={handleUpdateEmail}
            >
              ACTUALIZAR EMAIL
            </Button>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>ESTADO</Typography>
            <Typography variant="body2">{locker.abierto ? 'ABIERTO' : 'CERRADO'}</Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>CLAVE</Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#FFE0B2',
                color: 'black',
                mt: 1,
                '&:hover': { bgcolor: '#FFCC80' },
              }}
              onClick={handleSendCode}
            >
              VOLVER A PEDIR CLAVE
            </Button>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>CONTROLADOR</Typography>
            <Typography variant="body2">{locker.controller_name}</Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>ÚLTIMA APERTURA</Typography>
            <Typography variant="body2">MM/DD/YYYY - 1:09 PM</Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>CANTIDAD DE APERTURAS (ÚLTIMOS 7 DÍAS)</Typography>
            <Typography variant="body2">13</Typography>
          </Box>

          <Button
            fullWidth
            sx={{
              bgcolor: '#FFCDD2',
              color: 'black',
              mt: 2,
              '&:hover': { bgcolor: '#EF9A9A' },
            }}
            onClick={deleteLocker}
          >
            ELIMINAR CASILLERO
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LockerDetailsModal;
