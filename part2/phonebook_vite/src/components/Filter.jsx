export default function Filter(props){
   //Updates newNameFilter state live as user types
    const handleTypingNameFilter = (input) => 
    {
        props.setNewNameFilter(input.target.value);
    }
    
    
    
    return(
        <div>
          name: <input value={props.newNameFilter} onChange={handleTypingNameFilter}/>
        </div>
    );
}