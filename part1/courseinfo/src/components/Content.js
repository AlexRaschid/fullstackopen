const Content = (props) => {
    let part1 = props.part1;
    let part2 = props.part2;
    let part3 = props.part3;
    let exercises1 = props.exercises1;
    let exercises2 = props.exercises2;
    let exercises3 = props.exercises3;
    
    return (
      <div>
        <p>
            {part1} {exercises1}
        </p>
        <p>
            {part2} {exercises2}
        </p>
        <p>
            {part3} {exercises3}
        </p>
      </div>
    )
  }
  
  export default Content