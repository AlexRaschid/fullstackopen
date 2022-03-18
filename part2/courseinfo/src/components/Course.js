import Header from "./Header";
import Content from "./Content";
import Total from "./Total";


const Course = (props) => {
    let course = props.course;
    let exercisesTotal = course.parts.reduce((totalExercises, currentVal) => {
        return totalExercises + currentVal.exercises
    }, 0);
    return(
    <div>
        <Header course={course.name}/>
        <Content part1={course.parts[0].name}
                 part2={course.parts[1].name}
                 part3={course.parts[2].name}
                 exercises1={course.parts[0].exercises}
                 exercises2={course.parts[1].exercises}
                 exercises3={course.parts[2].exercises} />
        <Total   total={exercisesTotal}/>

    </div>
        
    )
}

export default Course;