const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const api = supertest(app);

const initialBlogs = [
  {
    title: 'lal laal al',
    author: 'me!!!',
    url: 'goodle',
    likes: 0,
  },
  {
    title: 'lol',
    author: 'adfaf',
    url: 'duckfuckno',
    likes: 1000,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test('blog list application return correct amount of posts in JSON', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
