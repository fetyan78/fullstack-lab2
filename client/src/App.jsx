import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import AddProjectForm from './components/AddProjectForm';
import AddAssignmentForm from './components/AddAssignmentForm'; // 👈 Lägg till nya formuläret här

function App() {
  const [reload, setReload] = useState(false);

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '1px auto',        // 👈 Mindre yttre mellanrum
        padding: '1px',            // 👈 Mindre inre padding
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'                // 👈 Lite mer mellanrum mellan formulär
      }}
    >
      <h1 style={{ fontSize: '1.8rem', margin: '0' }}>Projektlista</h1>

      {/* Formulär för att lägga till nya projekt */}
      <AddProjectForm onProjectAdded={() => setReload(!reload)} />

      {/* Formulär för att tilldela anställda till projekt */}
      <AddAssignmentForm onAssignmentAdded={() => {}} />

      {/* Lista över projekt */}
      <ProjectList reload={reload} />
    </div>
  );
}

export default App;
