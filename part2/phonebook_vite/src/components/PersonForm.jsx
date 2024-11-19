import axios from "axios";
export default function PersonForm({
  persons, 
  newName, 
  newPhone, 
  setPersons, 
  setNewName, 
  setNewPhone}){
    
    
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
            number: newPhone,
            firstName: firstName,
            lastName: lastName,
            id: (persons.length + 1).toString()
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
            setNewPhone('');

            axios.post('http://localhost:3001/persons', personObject)

        }
        }
    
    
    return(
        <form onSubmit={handleSubmit}>
        
        {/*2.10 TODO: component for the search filter*/}
        
        
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
    );
}