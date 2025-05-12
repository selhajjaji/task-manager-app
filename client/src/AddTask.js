
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axiosInstance';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';

function AddTask() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  const addTask = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('/tasks', { title, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlert({ open: true, message: 'Task added!', severity: 'success' });
      setTimeout(() => navigate('/tasks'), 1000);
    } catch {
      setAlert({ open: true, message: 'Error adding task', severity: 'error' });
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
      <Paper elevation={4} sx={{ padding: 4, width: 500 }}>
        <Typography variant="h5" gutterBottom>Add New Task</Typography>
        <TextField
          fullWidth label="Title" value={title}
          onChange={e => setTitle(e.target.value)} margin="normal"
        />
        <TextField
          fullWidth label="Description" value={description}
          onChange={e => setDescription(e.target.value)} margin="normal"
        />
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={addTask}>
          Add Task
        </Button>
      </Paper>
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddTask;
