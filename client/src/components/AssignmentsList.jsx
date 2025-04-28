import React, { useEffect, useState } from 'react';

function AssignmentsList({ reload }) { // 👈 Ta emot reload som prop
  const [assignments, setAssignments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchAssignments = () => {
    fetch('http://localhost:5000/api/project-assignments')
      .then(res => res.json())
      .then(data => setAssignments(data))
      .catch(err => console.error('❌ Fel vid hämtning av tilldelningar:', err));
  };

  const fetchEmployees = () => {
    fetch('http://localhost:5000/api/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error('❌ Fel vid hämtning av anställda:', err));
  };

  const fetchProjects = () => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('❌ Fel vid hämtning av projekt:', err));
  };

  useEffect(() => {
    fetchAssignments();
    fetchEmployees();
    fetchProjects();
    const interval = setInterval(() => {
      fetchAssignments();
      fetchEmployees();
      fetchProjects();
    }, 60000);

    return () => clearInterval(interval);
  }, [reload]); // 👈 Lägg till reload som beroende

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp.employee_id === employeeId);
    return employee ? employee.full_name : 'Okänd';
  };

  const getProjectName = (projectCode) => {
    const project = projects.find(proj => proj.project_code === projectCode);
    return project ? project.project_name : 'Okänt projekt';
  };

  return (
    <div>
      <h2>Project Assignments</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Project Name</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td>{assignment.employee_id}</td>
                <td>{getEmployeeName(assignment.employee_id)}</td>
                <td>{getProjectName(assignment.project_code)}</td>
                <td>{new Date(assignment.start_date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Inga tilldelningar hittades.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentsList;
