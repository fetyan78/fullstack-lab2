import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// GET /api/projects – hämta alla projekt
router.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Serverfel vid hämtning av projekt.' });
  }
});

// POST /api/projects – skapa ett nytt projekt
router.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
