import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import API_URL from './env';

const GestureFileForm = () => {
  const [files, setFiles] = useState([]);
  const [openOverlay, setOpenOverlay] = useState(false);
  const [editFile, setEditFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [openEditOverlay, setOpenEditOverlay] = useState(false);
  const [selectedGestures, setSelectedGestures] = useState({
    gesture1: '',
    gesture2: '',
    gesture3: '',
    gesture4: '',
    gesture5: '',
    gesture6: '',
  });

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${API_URL}/gesture_files`,
          {
            headers: {
              "ngrok-skip-browser-warning": true,
            }
          });
        setFiles(response.data);
      } catch (error) {
        console.error('Error al cargar los archivos de gestos:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleGestureChange = (event, gesture) => {
    setSelectedGestures({
      ...selectedGestures,
      [gesture]: event.target.value,
    });
  };

  const handleUpload = async () => {
    if (!file || !fileName) {
      alert('Por favor, selecciona un archivo y escribe un nombre para el archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('gesture_file[file]', file);
    formData.append('gesture_file[name]', fileName);
    Object.entries(selectedGestures).forEach(([key, value]) => {
      formData.append(`gesture_file[${key}]`, value);
    });

    try {
      const response = await axios.post(`${API_URL}/gesture_files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "ngrok-skip-browser-warning": true,
        },
      });
      alert('Archivo y gestos subidos correctamente');
      setFiles([...files, response.data]);
      setOpenOverlay(false);
      resetForm();
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };

  const handleEdit = async () => {
    if (!editFile) return;

    const formData = new FormData();
    formData.append('gesture_file[name]', fileName);
    
    // Si se selecciona un nuevo archivo, lo añadimos
    if (file) {
      formData.append('gesture_file[file]', file);
    }
    
    Object.entries(selectedGestures).forEach(([key, value]) => {
      formData.append(`gesture_file[${key}]`, value);
    });

    try {
      const response = await axios.put(`${API_URL}/gesture_files/${editFile.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Archivo actualizado correctamente');
      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.id === editFile.id ? response.data : f))
      );
      setOpenOverlay(false);
      resetForm();
    } catch (error) {
      console.error('Error al actualizar el archivo:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este archivo?')) return;

    try {
      await axios.delete(`http://localhost:3000/gesture_files/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          }
        });
      setFiles((prevFiles) => prevFiles.filter((f) => f.id !== id));
      alert('Archivo eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
    }
  };

  const handleEditOpen = (file) => {
    setEditFile(file);
    setSelectedGestures({
      gesture1: file.gesture1,
      gesture2: file.gesture2,
      gesture3: file.gesture3,
      gesture4: file.gesture4,
      gesture5: file.gesture5,
      gesture6: file.gesture6,
    });
    setFileName(file.name);
    setFile(null); // Limpiamos el archivo seleccionado
    setOpenOverlay(true);
  };

  const handleEditClose = () => {
    setEditFile(null);
    setOpenOverlay(false);
  };

  const handleCloseOverlay = () => {
    setOpenOverlay(false);
    resetForm();
  };

  const resetForm = () => {
    setEditFile(null);
    setFileName('');
    setFile(null);
    setSelectedGestures({
      gesture1: '',
      gesture2: '',
      gesture3: '',
      gesture4: '',
      gesture5: '',
      gesture6: '',
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        sx={{ marginBottom: 2 }}
        onClick={() => setOpenOverlay(true)}
      >
        Subir Nuevo Archivo
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Nombre</b></TableCell>
              <TableCell><b>Gesto 1</b></TableCell>
              <TableCell><b>Gesto 2</b></TableCell>
              <TableCell><b>Gesto 3</b></TableCell>
              <TableCell><b>Gesto 4</b></TableCell>
              <TableCell><b>Gesto 5</b></TableCell>
              <TableCell><b>Gesto 6</b></TableCell>
              <TableCell><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.gesture1}</TableCell>
                <TableCell>{file.gesture2}</TableCell>
                <TableCell>{file.gesture3}</TableCell>
                <TableCell>{file.gesture4}</TableCell>
                <TableCell>{file.gesture5}</TableCell>
                <TableCell>{file.gesture6}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditOpen(file)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(file.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para editar */}
      <Dialog open={openOverlay} onClose={handleCloseOverlay}>
        <DialogTitle>{editFile ? 'Editar Archivo y Gestos' : 'Subir Nuevo Archivo y Gestos'}</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              label="Nombre del Archivo"
              fullWidth
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              sx={{ mb: 2 }}
            />
            {!editFile && (
              <TextField
                type="file"
                fullWidth
                onChange={handleFileChange}
                sx={{ mb: 2 }}
              />
            )}
            {editFile && (
              <TextField
                type="file"
                fullWidth
                onChange={handleFileChange}
                sx={{ mb: 2 }}
                helperText="Si deseas cambiar el archivo, selecciona uno nuevo."
              />
            )}
            {['gesture1', 'gesture2', 'gesture3', 'gesture4', 'gesture5', 'gesture6'].map((gesture, index) => (
              <FormControl fullWidth key={gesture} sx={{ mb: 2 }}>
                <InputLabel>Seleccionar Gesto {index + 1}</InputLabel>
                <Select
                  value={selectedGestures[gesture]}
                  onChange={(e) => handleGestureChange(e, gesture)}
                  label={`Seleccionar Gesto ${index + 1}`}
                >
                  <MenuItem value="Handshake">Handshake</MenuItem>
                  <MenuItem value="Fingerprint">Fingerprint</MenuItem>
                  <MenuItem value="TouchApp">TouchApp</MenuItem>
                  <MenuItem value="PanTool">PanTool</MenuItem>
                  <MenuItem value="BackHand">BackHand</MenuItem>
                  <MenuItem value="Stop">Stop</MenuItem>
                </Select>
              </FormControl>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOverlay}>Cancelar</Button>
          <Button onClick={editFile ? handleEdit : handleUpload} variant="contained" color="primary">
            {editFile ? 'Guardar Cambios' : 'Subir Archivo'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GestureFileForm; 