import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

import employeeRoutes from './routes/employeeRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import projectAssignmentRoutes from './routes/projectAssignmentRoutes.js';

const app = express();
app.use(cors());
const PORT = 5000;

// Middleware för att hantera JSON
app.use(express.json());

// Anslut till databasen
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Ansluten till MongoDB'))
  .catch((err) => console.error('Fel vid anslutning till MongoDB:', err));

// Koppla routes
app.use(employeeRoutes);
app.use(projectRoutes);
app.use(projectAssignmentRoutes);

// Test-route
app.get('/', (req, res) => {
  res.send('Servern fungerar!');
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
