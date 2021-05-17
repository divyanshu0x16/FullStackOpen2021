import React, { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-1234567", id: 1 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const addPerson = (event) => {
        event.preventDefault();

        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        };

        const existingPerson = persons.find(
            (person) => person.name === newName
        );

        if (existingPerson !== undefined) {
            window.alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(persons.concat(newPerson));
            setNewName("");
            setNewNumber("");
        }
    };

    const handlePhoneChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handlePhoneChange} />
                </div>
                <div>
                    number:{" "}
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => (
                    <li key={person.id}>
                        {person.name} {person.number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
