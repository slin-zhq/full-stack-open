const Person = ({ name, number, del }) => (
        <div>
        {name} {number} <button onClick={del}>delete</button>      
        </div>
    )

const Persons = ({ persons, deletePerson }) => {
    return (
        <div>
            {persons.map(({ name, number, id }) => (
                <Person key={name} name={name} number={number} del={() => deletePerson(id, name)}/>
                )
            )}
        </div>
    )
}

export default Persons