import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import './db.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';


dotenv.config();
const app = express();


app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API running on :${port}`));