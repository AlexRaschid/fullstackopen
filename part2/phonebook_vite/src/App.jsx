import { useState, useEffect } from 'react';
import Person from './components/Person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import axios from 'axios';
import PersonsService from './services/PersonsService';

const App = () => {
  /*const [persons, setPersons] = useState
  ([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) */

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newNameFilter, setNewNameFilter] = useState('')


  useEffect(() => {
    console.log('effect')
    PersonsService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  return (
    //2.10 TODO: component for the form for adding new people to the phonebook
    <div>
      <h1>Phonebook</h1>
      <h2>Sort Phonebook Names:</h2>
        <Filter 
          newNameFilter={newNameFilter} 
          setNewNameFilter={setNewNameFilter} 
        />


      <h2>Add a Name and Number:</h2>
      <PersonForm 
        persons={persons}
        setPersons={setPersons}
        newPhone={newPhone}  
        newName={newName} 
        setNewPhone={setNewPhone}
        setNewName={setNewName}/>
      
      <h2>Numbers</h2>
      {/*Displays all names in persons state*/}
      {
        
        //2.10 TODO: a component that renders all people from the phonebook, 
        persons.map(person => 
        {
          //2.10 TODO: component for the search filter
          if(person.name.toLowerCase().includes(newNameFilter.toLowerCase()))
          {
            return <Person person={person} />
          }
        })
      }

      <div>debug: {newName}</div>
    </div>
  )
}

export default App