import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import profileRoutes from './routes/profile.js';
import experienceRoutes from './routes/experience.js';
import projectsRoutes from './routes/projects.js';
import appointmentsRoutes from './routes/appointments.js';
import skillsRoutes from './routes/skills.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/profile', profileRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/skills', skillsRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
