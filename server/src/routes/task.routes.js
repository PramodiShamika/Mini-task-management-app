// server/src/routes/task.routes.js
import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import Task from '../models/task.js'; // ✅ match file casing

const router = Router();

// GET /tasks → get user’s tasks
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(tasks);
});

// POST /tasks → add new task
router.post('/', auth, async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  const task = await Task.create({ user: req.userId, title });
  res.status(201).json(task);
});

// PUT /tasks/:id → update (toggle complete or rename)
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = await Task.findOne({ _id: id, user: req.userId });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  await task.save();
  res.json(task);
});

// DELETE /tasks/:id → delete
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, user: req.userId });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ success: true });
});

export default router;
