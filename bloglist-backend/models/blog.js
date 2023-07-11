// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const {
      title, author, url, likes,
    } = returnedObject;
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: returnedObject._id.toString(),
      title,
      author,
      url,
      likes,
    };
  },
});

module.exports = mongoose.model('Blog', blogSchema);
