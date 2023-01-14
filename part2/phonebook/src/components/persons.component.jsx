const Person = ({ id, name, number, deletePerson }) => {
    return (
        <>
            <div>
                {name} {number}
                <button onClick={() => deletePerson(id, name)} value={id}>delete</button>
            </div>
        </>
    );
}

const Persons = ({ filteredPersons, deletePerson }) => {
    return (
    <div>
        {filteredPersons.map((person) => <Person key={person.id} id={person.id} name={person.name} number={person.number} deletePerson={deletePerson}/>)}
    </div>
    );
}

export default Persons;