const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.json()); //for the body property of the object

app.use(middleware.tokenExtractor);

app.use('/api', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
