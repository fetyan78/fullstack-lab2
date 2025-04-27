import mongoose from 'mongoose';

const projectAssignmentSchema = new mongoose.Schema({
  employee_id: { type: String, required: true },
  project_code: { type: String, required: true },
  start_date: { type: Date, required: true }
});

export default mongoose.model('ProjectAssignment', projectAssignmentSchema);
