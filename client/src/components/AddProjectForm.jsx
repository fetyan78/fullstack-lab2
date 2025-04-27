import React, { useState } from 'react';

function AddProjectForm({ onProjectAdded }) {
  const [project, setProject] = useState({
    project_code: '',
    project_name: '',
    project_description: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); //Lägg till error state

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        const newProject = await response.json();
        onProjectAdded(newProject);
        setProject({ project_code: '', project_name: '', project_description: '' });

        // Visa lyckat meddelande
        setSuccessMessage('Projekt tillagt!');
        setErrorMessage(''); // Rensa eventuell gammal feltext

        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Misslyckades att lägga till projekt');
      }
    } catch (error) {
      console.error('Fel:', error.message);
      setErrorMessage( error.message);
      setSuccessMessage(''); // Rensa lyckat meddelande

      setTimeout(() => setErrorMessage(''), 4000); // Ta bort felmeddelande efter 4 sekunder
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Lägg till nytt projekt</h2>
      <input
        type="text"
        name="project_code"
        placeholder="Projektkod"
        value={project.project_code}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '8px' }}
      />
      <input
        type="text"
        name="project_name"
        placeholder="Projektnamn"
        value={project.project_name}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '8px' }}
      />
      <input
        type="text"
        name="project_description"
        placeholder="Projektbeskrivning"
        value={project.project_description}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '8px' }}
      />
      <button type="submit" style={{ width: '100%', padding: '10px', fontWeight: 'bold' }}>Lägg till</button>

      {/* Visa lyckat eller felmeddelande */}
      {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
    </form>
  );
}

export default AddProjectForm;
