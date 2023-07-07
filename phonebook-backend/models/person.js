/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: (phNumber) => {
        const regExp = /^\d{2}-\d{5,}$|^\d{3}-\d{4,}$/;
        return regExp.test(phNumber);
      },
      message: (props) => `${props.value} is not a valid phone number.`
                + 'A valid number must have length of 8 or more, '
                + 'and be formed of two parts that are separated by -, '
                + 'the first part has two or three numbers and '
                + 'the second part also consists of numbers',
    },
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const { name, number } = returnedObject;
    // returnedObject.id = returnedObject._id.toString();
    // delete returnedObject._id;
    // delete returnedObject.__v;
    return {
      id: returnedObject._id.toString(),
      name,
      number,
    };
  },
});

module.exports = mongoose.model('Person', personSchema);
