import { useState, useEffect } from 'react';
import Filter from './components/filter.component';
import PersonForm from './components/person-form.component';
import Persons from './components/persons.component';
import personService from './services/persons';

const App = () => {
  console.log('App entry point');
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('useEffect personService.getAll()');
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      setFilteredPersons(persons);
    });
  }, []);

  useEffect(() => {
    console.log('useEffect setFilteredPersons. filter: ', filter);
    setFilteredPersons(persons.filter((person) => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())));
  }, [filter, persons])


  const onNameChange = (event) => {
    console.log('onNameChange');
    setNewName(event.target.value);
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const addPerson = (event) => {
    console.log('addPerson');
    event.preventDefault();
    const person = persons.find(element => element.name === newName);
    if(!person)
    {
      personService.create({ name: newName, number: newNumber })
      .then(personObject => {
        setNewName('');
        setNewNumber('');
        setPersons(persons.concat(personObject));
        setFilteredPersons(persons.concat(personObject));
      });
    }
    else if(window.confirm(`${newName} is already added to the phonebook, replace the old number with new one?`))
    {
      personService.update(person.id, { name: newName, number: newNumber })
      .then((personObject) => {
        setNewName('');
        setNewNumber('');
        personService.getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
          setFilteredPersons(persons);
        });
      })
    }
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`))
    {
      personService.deleteEntry(id, name)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setFilteredPersons(persons);
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter  filter={filter} onFilterChange={onFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName} 
        onNameChange={onNameChange} 
        newNumber={newNumber} 
        onNumberChange={onNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App;