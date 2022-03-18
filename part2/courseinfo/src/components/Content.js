import Part from "./Part";

const Content = (props) => {
    let part1 = props.part1;
    let part2 = props.part2;
    let part3 = props.part3;
    let exercises1 = props.exercises1;
    let exercises2 = props.exercises2;
    let exercises3 = props.exercises3;
    
    return (
      <div>
        <Part part={part1} exercise={exercises1} />
        <Part part={part2} exercise={exercises2} />
        <Part part={part3} exercise={exercises3} />
      </div>
    )
  }
  
  export default Content