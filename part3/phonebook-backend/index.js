require("dotenv").config();
const { request, response } = require("express");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build"));

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

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if(person){
                response.json(person)
            }else{
                response.status(404).end()
            }
        })
        .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then((result) => {
            response.status(204).end();
        })
        .catch((error) => next(error));
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

    person.save().then((savedPerson) => {
        response.json(savedPerson);
    });
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
