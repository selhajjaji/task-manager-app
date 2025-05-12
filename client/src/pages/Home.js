
import React from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper elevation={4} sx={{ padding: 4, width: 500 }}>
        <Typography variant="h4" align="center" gutterBottom>Welcome to Task Manager</Typography>
        <Typography align="center" sx={{ mb: 3 }}>
          Manage your daily tasks efficiently and easily.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {isLoggedIn ? (
            <Button variant="contained" onClick={() => navigate('/tasks')}>View Tasks</Button>
          ) : (
            <>
              <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
              <Button variant="outlined" onClick={() => navigate('/register')}>Register</Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default Home;
