import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './components/filter.component';
import PersonForm from './components/person-form.component';
import Persons from './components/persons.component';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      setFilteredPersons(persons);
    });
  }, []);

  useEffect(() => {
    console.log('useEffect FilteredPersons')
    setFilteredPersons(persons.filter((person) => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())));
  }, [filter, persons]);


  const onNameChange = (event) => {
    setNewName(event.target.value);
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    if(!persons.find((person) => person.name === newName)) {
      personService.create({ name: newName, number: newNumber })
      .then(personObject => {
        setNewName('');
        setNewNumber('');
        setPersons(persons.concat(personObject));
        setFilteredPersons(persons.concat(personObject));
      });
    } else {
      alert(`${newName} is already added to the phonebook`)
    }
  }

  const deletePerson = (id, name) => {
    personService.deleteEntry(id)
      .then(() => {
        console.log('then');
        setPersons(persons.filter(person => person.id !== id));
        setFilteredPersons(persons);
      })
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

export default App