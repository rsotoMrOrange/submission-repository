import { useState, useEffect } from 'react';
import Filter from './components/filter.component';
import PersonForm from './components/person-form.component';
import Persons from './components/persons.component';
import personService from './services/persons';
import './App.css';

const ERROR = 'error';
const SUCCESS = 'success';

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.className}>
      {message.display}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      setFilteredPersons(persons);
    });
  }, []);

  useEffect(() => {
    setFilteredPersons(persons.filter((person) => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())));
  }, [filter, persons])


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
    const person = persons.find(element => element.name === newName);
    console.log(person);
    if(!person)
    {
      personService.create({ name: newName, number: newNumber })
      .then(personObject => {
        setPersons(persons.concat(personObject));
        setFilteredPersons(persons.concat(personObject));
        setMessage({ display: `Added '${personObject.name}'`, className: SUCCESS });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
    else if(window.confirm(`${newName} is already added to the phonebook, replace the old number with new one?`))
    {
      personService.update(person.id, { name: newName, number: newNumber })
      .then((returnedPerson) => {
        setPersons(persons.map(element => element.id !== returnedPerson.id ? element : returnedPerson));
      }).catch(() => {
        setMessage({ display: `Person '${person.name}' was already removed from server`, className: ERROR });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setPersons(persons.filter(element => element.id !== person.id));
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
      <Notification message={message} />
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