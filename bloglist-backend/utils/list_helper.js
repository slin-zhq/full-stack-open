const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (accumulatedTotalLikes, currentBlog) => accumulatedTotalLikes + currentBlog.likes;

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  const blogLikes = blogs.map((blog) => blog.likes);
  const mostLikes = Math.max(...blogLikes);
  const blogsWithMostLikes = blogs.filter((blog) => blog.likes === mostLikes);
  if (blogsWithMostLikes.length === 0) return {};

  const { title, author, likes } = blogsWithMostLikes[0];
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const authorBlogsObject = _.countBy(blogs, 'author');
  const authorBlogs = Object
    .entries(authorBlogsObject)
    .map(([key, value]) => ({ author: key, blogs: value }));
  const numBlogs = authorBlogs.map((authorBlog) => authorBlog.blogs);
  const maxBlogs = Math.max(...numBlogs);
  const authorsWithMostBlogs = authorBlogs.filter((authorBlog) => authorBlog.blogs === maxBlogs);
  return authorsWithMostBlogs.length === 0
    ? {}
    : authorsWithMostBlogs[0];
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  const reducer = (accumulator, currentBlog) => {
    const author = accumulator.find((item) => item.author === currentBlog.author);
    if (author) {
      author.likes += currentBlog.likes;
    } else {
      accumulator.push({ author: currentBlog.author, likes: currentBlog.likes });
    }
    return accumulator;
  };

  const authorsAndLikes = _.reduce(blogs, reducer, []);
  const likes = authorsAndLikes.map((author) => author.likes);
  const maxLikes = Math.max(...likes);
  const authorsWithMostLikes = authorsAndLikes.filter((author) => author.likes === maxLikes);
  return authorsWithMostLikes.length === 0
    ? {}
    : authorsWithMostLikes[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
