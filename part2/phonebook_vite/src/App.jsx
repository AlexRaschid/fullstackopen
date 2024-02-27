import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState
  ([
    { name: 'Arto Hellas',
      phone: '040-123456' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  

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
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
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
      
      {/*Displays all names in persons state
        TODO: map persons into a component
      */}
      {persons.map(person => 
        <div key={person.name}>{person.name} {person.phone}</div>
      )}

      <div>debug: {newName}</div>
    </div>
  )
}

export default App