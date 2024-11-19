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


    //Updates newName state live as user types
    const handleTypingName = (input) => 
      {
        setNewName(input.target.value);
      }
    
      //Updates newPhone state live as user types
      const handleTypingPhone = (input) => 
      {
        setNewPhone(input.target.value);
      }
      
      
      //Adds newName to persons state
      const handleSubmit = (input) =>  {
            input.preventDefault(); // prevent the default action of submitting HTML forms
            
            let nameArr = newName.split(' ');
            let firstName = nameArr[0];
            let lastName = nameArr[1];
        
            const personObject = {
                name: newName,
                number: newPhone,
                firstName: firstName,
                lastName: lastName,
                id: (persons.length + 1).toString()
            }
      
         // Checks if name is already in persons state
            const existingPerson = persons.find(person => person.name === newName);

            if (existingPerson) {
              if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                const updatedPerson = { ...existingPerson, number: newPhone };

                PersonsService.update(existingPerson.id, updatedPerson)
                  .then(response => {
                    setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data));
                    setNewName('');
                    setNewPhone('');
                  })
                  .catch(error => {
                    console.error('There was an error updating the person:', error);
                  });
              }
            } else {
              PersonsService.create(personObject)
                .then(response => {
                  setPersons(persons.concat(response.data));
                  setNewName('');
                  setNewPhone('');
                })
                .catch(error => {
                  console.error('There was an error adding the person:', error);
                });
            }
          }

          const handleDeletePerson = (id) => {
            PersonsService.deleteService(id)
            .then(response => {
              setPersons(persons.filter(person => person.id !== id));//filter out the person with the id
            })
            .catch(error => {
              console.error('There was an error deleting the person:', error);
            });
            
          }
      


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
        setNewName={setNewName}
        handleSubmit={handleSubmit}
        handleTypingName={handleTypingName}
        handleTypingPhone={handleTypingPhone}/>
      
      <h2>Numbers</h2>
      {/*Displays all names in persons state*/}
      {
        
        //2.10 TODO: a component that renders all people from the phonebook, 
        persons.map(person => 
        {
          //2.10 TODO: component for the search filter
          if(person.name.toLowerCase().includes(newNameFilter.toLowerCase()))
          {
            //console.log(person);
            return <Person key={person.id} 
                    personId={person.id} 
                    personName={person.name}  
                    personPhone={person.number}
                    deletePerson={handleDeletePerson}
            />
          }
        })
      }

      <div>debug: {newName}</div>
    </div>
  )
}

export default App