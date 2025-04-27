import express from 'express';
import ProjectAssignment from '../models/ProjectAssignment.js';

const router = express.Router();

// Skapa ett nytt projekt-tilldelning
router.post('/api/project-assignments', async (req, res) => {
  try {
    const newAssignment = new ProjectAssignment(req.body);
    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Hämta alla projekt-tilldelningar
router.get('/api/project-assignments', async (req, res) => {
  try {
    const assignments = await ProjectAssignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
