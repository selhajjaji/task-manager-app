
import React, { useEffect, useState } from 'react';
import axios from './axiosInstance';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setAlert({ open: true, message: 'Error fetching tasks', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (title) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/tasks/${title}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
      setAlert({ open: true, message: 'Task deleted', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: 'Error deleting task', severity: 'error' });
    }
  };

  const updateTask = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/tasks/${editedTitle}`, {
        title: editedTitle,
        description: editedDescription
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingIndex(null);
      fetchTasks();
      setAlert({ open: true, message: 'Task updated', severity: 'success' });
    } catch {
      setAlert({ open: true, message: 'Error updating task', severity: 'error' });
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
      <Paper elevation={4} sx={{ padding: 4, width: 600 }}>
        <Typography variant="h5" gutterBottom>Your Tasks</Typography>
<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="outlined" size="small" onClick={fetchTasks}>
            Refresh
          </Button>
        </Box>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index} divider>
              {editingIndex === index ? (
                <Box sx={{ width: '100%' }}>
                  <TextField
                    fullWidth label="Title" value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)} margin="dense"
                  />
                  <TextField
                    fullWidth label="Description" value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)} margin="dense"
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
                    <Button variant="contained" size="small" onClick={updateTask}>Save</Button>
                    <Button variant="outlined" size="small" onClick={() => setEditingIndex(null)}>Cancel</Button>
                  </Box>
                </Box>
              ) : (
                <>
                  <ListItemText
                    primary={task.title}
                    secondary={task.description}
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setEditingIndex(index);
                        setEditedTitle(task.title);
                        setEditedDescription(task.description);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => deleteTask(task.title)}
                    >
                      Delete
                    </Button>
                  </Box>
                </>
              )}
            </ListItem>
          ))}
        </List>
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

export default TaskList;
