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
  const deleted = await Blog.findOneAndDelete({ _id: id})

  if(deleted) console.log(`Successfully deleted document that had the form: ${deleted}`)
  else console.log("No document matches the provided query.")
  
  response.status(204).end();
});

module.exports = blogsRouter;
