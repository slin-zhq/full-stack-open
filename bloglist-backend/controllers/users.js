/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, author: 1 });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const missingUsername = !username;
  const missingPassword = !password;
  const invalidUsername = username ? username.length < 3 : false;
  const invalidPassword = password ? password.length < 3 : false;
  const errorMessage = [];

  if (missingUsername) {
    errorMessage.push('username is missing.');
  }
  if (missingPassword) {
    errorMessage.push('password is missing');
  }
  if (invalidUsername) {
    errorMessage.push('username must be at least 3 characters long.');
  }
  if (invalidPassword) {
    errorMessage.push('password must be at least 3 characters long.');
  }

  if (errorMessage.length > 0) {
    response.status(400).json({
      error: errorMessage.join(' '),
    });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  }

  // if (!(username && password)) {
  //   response.status(400).json({
  //     error: 'username and/or password are missing',
  //   });
  // }

  // if (username.length < 3 || password.length < 3) {
  //   response.status(400).json({
  //     error: 'username and/or password must each be at least 3 characters long',
  //   });
  // }
});

module.exports = usersRouter;
