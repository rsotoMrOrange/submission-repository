const PersonForm = ({ addPerson, newName, onNameChange, newNumber, onNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={onNameChange}/>
          number: <input value={newNumber} onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
}

export default PersonForm;