const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/blogs', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/blogs/:id', async (request, response) => {
  const id = request.params.id;
  await Blog.findOneAndDelete({ _id: id });
  response.status(204).end();
});

blogsRouter.put('/blogs/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
