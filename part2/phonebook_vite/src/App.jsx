import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState
  ([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')
  

  //Updates newName state live as user types
  const handleTypingName = (input) => 
  {
    setNewName(input.target.value);
  }

  //Adds newName to persons state
  const handleSubmitName = (name) =>
  {
    name.preventDefault(); // prevent the default action of submitting HTML forms

    let nameArr = newName.split(' ');
    let firstName = nameArr[0];
    let lastName = nameArr[1];


    const nameObject = {
      name: newName,
      firstName: lastName
    }

    setPersons(persons.concat(nameObject));
    setNewName('');
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmitName}>
        <div>
          name: <input value={newName} onChange={handleTypingName}/>
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
      <div key={person.name}>{person.name}</div>
      )}

      <div>debug: {newName}</div>
    </div>
  )
}

export default App