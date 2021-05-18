import React from "react";

const Persons = ({ persons }) => {
    return (
        <div>
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

export default Persons;
