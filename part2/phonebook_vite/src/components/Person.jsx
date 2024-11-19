const Person = (props) => {
    return (
      <li>{props.personName} | {props.personPhone} | 
        <button onClick={() => {
          if(confirm(`Are you sure to delete ${props.personName}?`)){
            props.deletePerson(props.personId);

          }
        }}>Delete</button>
      </li>
    )
  }
  
  export default Person