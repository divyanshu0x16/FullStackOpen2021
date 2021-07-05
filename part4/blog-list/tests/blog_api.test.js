const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');

const api = supertest(app);

test('blog list application return correct amount of posts in JSON', async () => {
  await api.get('/api/notes');
});

afterAll(() => {
  mongoose.connection.close();
});
