require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

// creating custom morgan token...
morgan.token('post-request-body', (request) => (request.method === 'POST' || request.method === 'PUT'
  ? JSON.stringify(request.body)
  : ''));

app.use(express.json());
app.use(cors());
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-request-body',
  ), // morgan format adapted from the predefined format 'tiny'
);
app.use(express.static('build'));

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    const numPersons = persons.length;
    response.send(`
            <div>Phonebook has info for ${numPersons} ${numPersons === 1 ? 'person' : 'people'}</div>
            <br/>
            <div>${new Date()}</div>
        `);
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body;

  if (!name && !number) {
    response.status(400).json({
      error: 'name and number missing',
    });
  } else if (!name) {
    response.status(400).json({
      error: 'name missing',
    });
  } else if (!number) {
    response.status(400).json({
      error: 'number missing',
    });
  } else {
    const person = new Person({
      name,
      number: number || '',
    });

    person.save().then((savedPerson) => {
      response.json(savedPerson);
    })
      .catch((error) => next(error));
  }
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
//   console.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
