const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('unique identifier property is named \'id\'', async () => {
    const response = await api.get('/api/blogs');
    const oneBlog = response.body[0];
    expect(oneBlog.id).toBeDefined();
  });
});

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Part 4b. Testing the backend',
      author: 'Full Stack open',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
      likes: 37,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const matchedBlog = await helper.findBlogByObject(newBlog);
    expect(matchedBlog).toBeDefined();
  });
});

describe('handles missing properties properly', () => {
  test('a blog with missing \'likes\' property has default 0 likes', async () => {
    const newBlog = {
      title: 'Part 4b. Testing the backend',
      author: 'Full Stack open',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogToFind = { ...newBlog, likes: 0 };
    const matchedBlog = await helper.findBlogByObject(blogToFind);
    expect(matchedBlog.likes).toBeDefined();
    expect(matchedBlog.likes).toBe(0);
  });

  test('a blog with missing \'title\' is not added', async () => {
    const newBlog = {
      author: 'anonymous',
      url: 'https://whoissaw.com',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('a blog with missing \'url\' is not added', async () => {
    const newBlog = {
      title: 'Saw is awesome!',
      author: 'anonymous',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('a blog with missing \'title\' and \'url\' is not added', async () => {
    const newBlog = {
      author: 'anonymous',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1,
    );

    const matchedBlog = await helper.findBlogByObject(blogToDelete);

    expect(matchedBlog).not.toBeDefined();
  });

  test('fails with status code 404 if id is not found', async () => {
    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtStart = await helper.blogsInDb();

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(404);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length,
    );
  });
});

describe('updating a blog', () => {
  test('succeeds if id is valid', async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[blogs.length - 1];
    const blogUpdate = {
      author: 'New author',
      likes: 150,
    };

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogUpdate);

    const updatedBlog = result.body;
    const isUpdateSuccessful = helper.isUpdateAppiedToBlog(updatedBlog, blogUpdate);
    expect(isUpdateSuccessful).toBe(true);
  });

  test('fails with status code 404 if id is not found', async () => {
    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogUpdate = {
      likes: 150,
    };

    await api
      .put(`/api/blogs/${blogToDelete.id}`)
      .send(blogUpdate)
      .expect(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
