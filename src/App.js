import { useEffect, useState } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    const fetching = async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/users');
      const monsters = await data.json();
      setMonsters(monsters);
    }
    fetching();
  }, []);

  useEffect(() => {
  const newFilteredMonsters = monsters.filter(monster =>
    monster.name.toLowerCase().includes(searchField.toLowerCase())
  );

  setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  return (
    <div className='App'>
      <h1>Monsters Bolodex</h1>
      <SearchBox
        placeholder='search monsters'
        handleChange={handleChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
