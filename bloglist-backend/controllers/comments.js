/* eslint-disable no-underscore-dangle */
const commentsRouter = require('express').Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');

commentsRouter.post('/', async (request, response) => {
  const { comment, blogId } = request.body;

  const newComment = {
    comment,
    blogId,
  };

  const newCommentObj = new Comment(newComment);
  const savedComment = await newCommentObj.save();
  const blog = await Blog.findById(blogId);
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();
  response.status(201).json(savedComment);
});

module.exports = commentsRouter;
