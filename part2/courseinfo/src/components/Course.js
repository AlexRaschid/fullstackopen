import Header from "./Header";
import Content from "./Content";
import Total from "./Total";


const Course = (props) => {
    
    
    return(
    <div>
        {props.course.map((course)=> {
            let exercisesTotal = course.parts.reduce((totalExercises, currentVal) => {
                return totalExercises + currentVal.exercises
            }, 0);

            return (
                <div>
                    <Header course={course.name}/>
                    <Content parts={course.parts}/>
                    <Total   total={exercisesTotal}/>
                </div>
            )
        
        })}

        

    </div>
        
    )
}

export default Course;