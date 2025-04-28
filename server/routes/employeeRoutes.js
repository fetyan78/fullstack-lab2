import express from 'express';
import Employee from '../models/Employee.js';

const router = express.Router();

// POST /api/employees - skapa en ny anställd
router.post('/api/employees', async (req, res) => {
  try {
    const { employee_id, full_name, email, hashed_password } = req.body;

    const employee = new Employee({ employee_id, full_name, email, hashed_password });
    await employee.save();

    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/employees - hämta alla anställda
router.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
