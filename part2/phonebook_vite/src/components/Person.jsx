const Person = (props) => {
    return (
      <li>{props.personName} | {props.personPhone} | 
        <button onClick={() => {
          if(confirm("Are you sure?")){
            
          }
        }}>Delete Person</button>
      </li>
    )
  }
  
  export default Person