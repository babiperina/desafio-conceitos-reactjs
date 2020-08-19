import React, {useState, useEffect } from "react";
import api from './services/api.js';

import "./styles.css";

function App() {
  // const repositories = ['Repositório da Babi'];
  const [repositories, setRepositories] = useState([]);

  //imutável
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories',{
      title: `Novo projeto ${Date.now()}`,
      url: 'www.hehehe.com.br',
      techs: [
        'Aleatório 1', 'Aleatório 2'
      ]
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);

  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`, {});

    const repoIndex = repositories.findIndex(repo => repo.id === id);
  
    repositories.splice(repoIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
         <li key={repo.id}>{repo.title}<button onClick={() => handleRemoveRepository(repo.id)}>Remover</button></li> 
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
