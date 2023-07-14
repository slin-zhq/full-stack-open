const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const findBlogByObject = async (blogToFind) => {
  const blogs = await blogsInDb();

  const matchedBlog = blogs.find((blog) => {
    const blogWithoutId = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    };
    return JSON.stringify(blogWithoutId) === JSON.stringify(blogToFind);
  });

  return matchedBlog;
};

const isUpdateAppiedToBlog = (blog, blogUpdate) => {
  for (let prop in blogUpdate) {
    if (!(prop in blog) || blog[prop] !== blogUpdate[prop]) {
      return false;
    }
  }
  return true;
};

module.exports = {
  initialBlogs, blogsInDb, findBlogByObject, isUpdateAppiedToBlog,
};
