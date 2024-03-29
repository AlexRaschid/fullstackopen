import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNote = (event) => {
    event.preventDefault();

    //How I would use a "person's name as a value of the key property"
    //let nameArr = newName.split(' ');
    //let firstName = newName.split(' ')[0];
    //let lastName = newName.split(' ')[1];

    const nameObject = {
      name: newName,
      //firstName: lastName
    }
  
    setPersons(persons.concat(nameObject));
    setNewName('');
  }

  const handleNameInput = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleNameInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...

      <div>debug: {newName}</div>
    </div>
  )
}

export default App