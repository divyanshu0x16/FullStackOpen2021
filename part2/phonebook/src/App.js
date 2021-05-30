import React, { useState, useEffect } from "react";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    useEffect(() => {
        personService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);

    const addPerson = (event) => {
        event.preventDefault();

        const newPerson = {
            name: newName,
            number: newNumber,
        };

        const existingPerson = persons.find(
            (person) => person.name === newName
        );

        if (existingPerson !== undefined) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                personService
                    .update(existingPerson.id, newPerson)
                    .then((updatedPerson) => {
                        setPersons(
                            persons.map((person) =>
                                person.id !== existingPerson.id
                                    ? person
                                    : updatedPerson
                            )
                        );
                        setNewName("");
                        setNewNumber("");
                    });
            }
        } else {
            personService.create(newPerson).then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
                setNewName("");
                setNewNumber("");
            });
        }
    };

    const handlePhoneChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const deleteEntry = (person) => {
        const deletedId = person.id;

        if (window.confirm(`Delete ${person.name} ?`)) {
            personService.deletePerson(person.id).then(() => {
                setPersons(persons.filter((person) => person.id !== deletedId));
            });
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                newNumber={newNumber}
                handlePhoneChange={handlePhoneChange}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={persons} onDelete={deleteEntry} />
        </div>
    );
};

export default App;
