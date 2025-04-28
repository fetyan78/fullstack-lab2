import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import AddProjectForm from './components/AddProjectForm';
import AddAssignmentForm from './components/AddAssignmentForm';
import AssignmentsList from './components/AssignmentsList'; // 👈 Viktigt!

function App() {
  const [reload, setReload] = useState(false); // 👈 Reload triggar omhämtning av data

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '1px auto',
        padding: '1px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <h1 style={{ fontSize: '1.8rem', margin: '0' }}>Projektlista</h1>

      {/* Formulär för att lägga till nytt projekt */}
      <AddProjectForm onProjectAdded={() => setReload(!reload)} />

      {/* Formulär för att tilldela anställd */}
      <AddAssignmentForm onAssignmentAdded={() => setReload(!reload)} /> {/* 👈 Viktigt att trigga reload */}

      {/* Visa alla projekt */}
      <ProjectList reload={reload} />

      {/* Visa alla projekt-tilldelningar */}
      <AssignmentsList reload={reload} /> {/* 👈 Viktigt att skicka reload */}
    </div>
  );
}

export default App;
