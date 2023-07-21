/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

// const User = require('../models/user');

describe('`username` and `password` validation', () => {
  test('creation fails with missing `username` and `password`', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'User missing `username` and `password`',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with invalid `username` format', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'tu',
      name: 'test user with invalid `username` format',
      password: 'invalid_username',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with invalid `password` format', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'test-user-invalid-password',
      name: 'test user with invalid `password` format',
      password: 'tu',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
