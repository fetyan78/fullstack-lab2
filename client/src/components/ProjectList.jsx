import React, { useEffect, useState } from 'react';
import ProjectTable from './ProjectTable';

function ProjectList({ reload }) {
  const [projects, setProjects] = useState([]);

  const fetchProjects = () => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => {
        console.log(' Hämtade projekt:', data);
        setProjects(data);
      })
      .catch(err => console.error('Fel vid hämtning av projekt:', err));
  };

  useEffect(() => {
    fetchProjects();
    const interval = setInterval(fetchProjects, 60000);
    return () => clearInterval(interval);
  }, [reload]);

  return (
    <div>
      <h2>Projektlista</h2>
      {projects.length > 0 ? (
        <ProjectTable projects={projects} />
      ) : (
        <p>Inga projekt hittades.</p>
      )}
    </div>
  );
}

export default ProjectList;
