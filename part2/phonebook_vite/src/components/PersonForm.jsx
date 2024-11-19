import axios from "axios";
export default function PersonForm(props){
    
    
    
    return(
        <form onSubmit={props.handleSubmit}>
        
        {/*2.10 TODO: component for the search filter*/}
        
        
        <div>
          name: <input value={props.newName} onChange={props.handleTypingName}/>
        </div>
        <div>
          number: <input value={props.newPhone} onChange={props.handleTypingPhone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
}