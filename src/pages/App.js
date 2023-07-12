import { useState } from 'react';
import Logo from '../assets/logo.png';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';

import { Container } from './styles';
import Button from '../components/Button';
import { api } from '../services/api';

const App = () => {

  const [currentRepo, setCurrentRepo ] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`);
    const isAdded = repos.find((repo) => repo.id === data.id);
    if (!isAdded) {
      setRepos(prev => [...prev, data]);
      setCurrentRepo('');
      return
    }
    alert('Repositório já adicionado');
  };

  const handleRemoveRepo = (id) => {
    const isEqual = repos.filter((repo) => repo.id !== id);
    setRepos(isEqual);
  };

  return (
    <Container>
      <img src={Logo} alt="Logo" width={72} height={72}></img>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map((repo) => <ItemRepo repo={repo} handleRemoveRepo={handleRemoveRepo} key={repo.id} />)}
    </Container>
  )
};

export default App;