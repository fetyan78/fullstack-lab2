import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  employee_id: { type: String, required: true, unique: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  hashed_password: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
