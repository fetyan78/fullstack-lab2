import React, { useState } from 'react';

function ProjectTable({ projects }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key] ? a[sortConfig.key].toString().toLowerCase() : '';
      const bValue = b[sortConfig.key] ? b[sortConfig.key].toString().toLowerCase() : '';
      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th onClick={() => requestSort('project_name')}>Projektnamn </th>
          <th onClick={() => requestSort('project_description')}>Beskrivning </th>
        </tr>
      </thead>
      <tbody>
        {sortedProjects.map((project) => (
          <tr key={project._id}>
            <td>{project.project_name}</td>
            <td>{project.project_description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProjectTable;
