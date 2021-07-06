const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.post('/', async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  try {
    if (request.body.username.length < 3 || request.body.password.length < 3) {
      response
        .status(400)
        .json('Username and password must be atleast 3 characters long');
    } else {
      const savedUser = await user.save();
      response.json(savedUser);
    }
  } catch (error) {
    response.status(400).json(error.message);
  }
});

userRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = userRouter;
