const Part = (props) => {
    let part = props.part;
    let exercise = props.exercise;

    return (
        <p>
            {part} {exercise}
        </p>
    )

}

export default Part;