import express from 'express';
import Employee from '../models/Employee.js';

const router = express.Router();

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

export default router;
