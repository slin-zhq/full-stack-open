const express = require('express')
const app = express()

const morgan = require('morgan')

// creating custom morgan token...
morgan.token('post-request-body', (request, response) => {
    return request.method === 'POST' 
        ? JSON.stringify(request.body)
        : ''
})

app.use(express.json())
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :post-request-body'
    ) // morgan format adapted from the predefined format 'tiny'
)

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const numPersons = persons.length
    response.send(`
        <div>Phonebook has info for ${numPersons} ${numPersons === 1 ? 'person' : 'people'}</div>
        <br/>
        <div>${new Date()}</div>
    `)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const min = 5
    const max = 1000000
    return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (request, response) => {
    console.log('request:', request)
    const body = request.body

    if (!body.name && !body.number) {
        return response.status(400).json({
            error: 'name and number missing'
        })
    } else if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const duplicatePerson = persons.find(p => p.name === body.name)
    if (duplicatePerson) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(), 
        name: body.name, 
        number: body.number ? body.number : '',
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})