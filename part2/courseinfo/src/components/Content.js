import Part from "./Part";

const Content = (props) => {
    
    return (
      <div>
        {props.parts.map((e) => {
          return <Part key={e.id} part={e.name} exercise={e.exercises}/>
        })}
      </div>
    )
  }
  
  export default Content