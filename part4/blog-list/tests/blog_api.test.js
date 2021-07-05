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

test('unique identifier is named id', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
})

test('a blog can be added', async () => {
  const newBlog = {
    title: 'your dad',
    author: 'me',
    url: 'github',
    likes: 123
  }

  await api.post('/api/blogs').send(newBlog).expect(201)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length+1)
})

afterAll(() => {
  mongoose.connection.close();
});
