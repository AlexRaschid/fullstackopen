import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState
  ([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newNameFilter, setNewNameFilter] = useState('')

  //Updates newNameFilter state live as user types
  const handleTypingNameFilter = (input) => 
  {
    setNewNameFilter(input.target.value);
  }

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
  const handleSubmit = (input) =>
  {
    input.preventDefault(); // prevent the default action of submitting HTML forms
    
    let nameArr = newName.split(' ');
    let firstName = nameArr[0];
    let lastName = nameArr[1];

    const personObject = {
      name: newName,
      phone: newPhone,
      firstName: lastName
    }

    //Checks if name is already in persons state
    const namePresent = (person) => person.name === newName;
    if(persons.some(namePresent))
    {
      alert(`${newName} is already added to phonebook`);
      return;

    } else {
      //parseName(newName);
      setPersons(persons.concat(personObject));
      setNewName('');
    }
  }

  return (
    //2.10 TODO: component for the form for adding new people to the phonebook
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <h2>Sort Phonebook Names:</h2>
        {/*2.10 TODO: component for the search filter*/}
        <div>
          name: <input value={newNameFilter} onChange={handleTypingNameFilter}/>
        </div>
        <h2>Add a Name and Number:</h2>
        <div>
          name: <input value={newName} onChange={handleTypingName}/>
        </div>
        <div>
          number: <input value={newPhone} onChange={handleTypingPhone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
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