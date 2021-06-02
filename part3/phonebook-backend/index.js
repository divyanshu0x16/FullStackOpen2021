require('dotenv').config()
const { request, response } = require("express");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const Person = require('./models/person')

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build"));

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1,
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2,
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3,
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4,
    },
];

app.get("/api/persons", (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    });
});

app.get("/info", (request, response) => {
    let date = new Date();
    Person.find({}).then((persons) => {
        response.send(
            `Phonebook has info for ${
                persons.length
            } people <br/><br/>  ${date.toDateString()} ${date.toTimeString()}`
        );
    });
});

app.get("/api/persons/:id", (request, response) => {
    const id = (request.params.id);
    Person.find({ _id : id}).then((person) => {
        response.json(person)
    });
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);

    response.status(204).end();
});

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: "name is missing",
        });
    }

    if (!body.number) {
        return response.status(400).json({
            error: "number is missing",
        });
    }

    //const existingPerson = persons.find((person) => person.name === body.name);

    /*if (existingPerson !== undefined) {
        return response.status(400).json({
            error: "name must be unique",
        });
    }*/

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
});

const PORT = process.env.PORT
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
