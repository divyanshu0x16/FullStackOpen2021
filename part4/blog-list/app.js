const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

app.use(cors());
app.use(express.json()); //for the body property of the object

app.use('/api', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

module.exports = app;
