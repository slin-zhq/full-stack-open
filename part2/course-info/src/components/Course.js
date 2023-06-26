const Course = ({ course }) => {
    const { name, parts } = course
    const partsToRender = parts.map((part) => (
        <p key={part.id}>
            {part.name} {part.exercises}
        </p>
    ))

    const totalExercises = parts.reduce((total, part) => total + part.exercises, 0)

    return (
        <div>
            <h2>{name}</h2>
            {partsToRender}
            <p><strong>total of {totalExercises} exercises</strong></p>
        </div>
    )
}

export default Course