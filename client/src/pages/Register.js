
import React, { useState } from 'react';
import axios from '../axiosInstance';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  const registerUser = async () => {
    if (password !== confirmPassword) {
      setAlert({ open: true, message: 'Passwords do not match!', severity: 'error' });
      return;
    }

    try {
      const res = await axios.post('/register', { username, password });
      setAlert({ open: true, message: res.data.message, severity: 'success' });
      setTimeout(() => window.location.href = '/login', 1500);
    } catch (err) {
      setAlert({ open: true, message: 'Registration failed', severity: 'error' });
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper elevation={4} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>Register</Typography>
        <TextField
          fullWidth label="Username" variant="outlined" margin="normal"
          value={username} onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth type="password" label="Password" variant="outlined" margin="normal"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          fullWidth type="password" label="Confirm Password" variant="outlined" margin="normal"
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          fullWidth variant="contained" color="primary" sx={{ mt: 2 }}
          onClick={registerUser}
        >
          Register
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

export default Register;
