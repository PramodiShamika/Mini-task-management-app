// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api'; // your API helper
import { logout } from '../lib/auth'; // your logout helper

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  // Add a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      const res = await api.post('/tasks', { title });
      setTasks((prev) => [res.data, ...prev]);
      setTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle task completion
  const handleToggle = async (id) => {
    const task = tasks.find((t) => (t._id || t.id) === id);
    if (!task) return;

    try {
      const res = await api.patch(`/tasks/${id}`, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => ((t._id || t.id) === id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => (t._id || t.id) !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '24px auto', padding: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Your Tasks</h2>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout
        </button>
      </header>

      <section style={{ marginTop: 16 }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task title"
            style={{ padding: 8, width: '70%', marginRight: 8 }}
          />
          <button type="submit">Add Task</button>
        </form>

        <ul style={{ marginTop: 16, listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task._id || task.id}
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}
            >
              <span
                onClick={() => handleToggle(task._id || task.id)}
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                }}
              >
                {task.title}
              </span>
              <button onClick={() => handleDelete(task._id || task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
