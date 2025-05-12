
import React, { useState } from 'react';
import axios from '../axiosInstance';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  const loginUser = async () => {
    try {
      const res = await axios.post('/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setAlert({ open: true, message: 'Login successful!', severity: 'success' });
      setTimeout(() => window.location.href = '/tasks', 1500);
    } catch {
      setAlert({ open: true, message: 'Login failed. Please check your credentials.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper elevation={4} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        <TextField
          fullWidth label="Username" variant="outlined" margin="normal"
          value={username} onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth type="password" label="Password" variant="outlined" margin="normal"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth variant="contained" color="primary" sx={{ mt: 2 }}
          onClick={loginUser}
        >
          Login
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

export default Login;
