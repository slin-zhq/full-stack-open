/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('creator', { username: 1, name: 1 })
    .populate('comments', { comment: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const {
    title, author, url, likes,
  } = request.body;
  const { user } = request;

  const missingTitle = !title;
  const missingUrl = !url;
  const errorMessage = [];

  if (missingTitle) {
    errorMessage.push('title is required.');
  }
  if (missingUrl) {
    errorMessage.push('url is required.');
  }
  if (errorMessage.length > 0) {
    response.status(400).json({
      error: errorMessage.join(' '),
    });
  } else {
    const newBlog = {
      title,
      author,
      url,
      likes: likes || 0,
      creator: user._id,
    };
    const newBlogObject = new Blog(newBlog);
    const savedBlog = await newBlogObject.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    const savedBlogInResponse = await Blog.findById(savedBlog._id).populate('creator', { username: 1, name: 1 });
    response.status(201).json(savedBlogInResponse);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const { user } = request;

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: 'blog that matches the id not found' });
  }
  if (blog.creator.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'user unauthorized to delete blog' });
  }

  await Blog.findByIdAndRemove(request.params.id);
  return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' },
  );

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
