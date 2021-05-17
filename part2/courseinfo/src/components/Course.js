import React from "react";

const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
};

const Total = ({ parts }) => {
    const sum = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p>
            <b>total of {sum} exercises</b>
        </p>
    );
};

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    );
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}
        </div>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course