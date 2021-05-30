import React from "react";

const Persons = ({ persons, onDelete }) => {
    return (
        <div>
            <ul>
                {persons.map((person) => (
                    <li key={person.id}>
                        {person.name} {person.number} <button onClick={() => onDelete(person)} >delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Persons;
