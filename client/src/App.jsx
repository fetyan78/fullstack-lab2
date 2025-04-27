import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import AddProjectForm from './components/AddProjectForm';

function App() {
  const [reload, setReload] = useState(false);

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '1px auto',        
        padding: '1px',            
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '1px'                 
      }}
    >
      <h1 style={{ fontSize: '1.8rem', margin: '0' }}>Projektlista</h1>  
      <AddProjectForm onProjectAdded={() => setReload(!reload)} />
      <ProjectList reload={reload} />
    </div>
  );
}

export default App;
