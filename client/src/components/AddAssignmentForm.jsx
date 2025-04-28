import React, { useState } from 'react';

function AddAssignmentForm({ onAssignmentAdded }) {
  const [assignment, setAssignment] = useState({
    employee_id: '',
    project_code: '',
    start_date: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/project-assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assignment),
      });

      if (response.ok) {
        onAssignmentAdded && onAssignmentAdded();
        setAssignment({ employee_id: '', project_code: '', start_date: '' });
        setSuccessMessage('✅ Tilldelning lyckades!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        throw new Error('Misslyckades att skapa tilldelning');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(''), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tilldela anställd till projekt</h2>
      <input
        type="text"
        name="employee_id"
        placeholder="Anställd-ID"
        value={assignment.employee_id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="project_code"
        placeholder="Projektkod"
        value={assignment.project_code}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="start_date"
        value={assignment.start_date}
        onChange={handleChange}
        required
      />
      <button type="submit">Tilldela</button>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
}

export default AddAssignmentForm;
