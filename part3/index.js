const express = require('express')
const app = express()

app.use(express.json())

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>');
 });

 app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${phonebook.length} people <br/> ${new Date()} </p>`);
 });

 app.get('/api/persons', (req, res) => {
    res.json(phonebook)
 })

 app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = phonebook.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phonebook = phonebook.filter(note => note.id !== id)
  
    response.status(204).end()
  })


  const generateId = () => {
    const maxId = phonebook.length > 0
      ? Math.max(...phonebook.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId(),
    }
  
    phonebook = phonebook.concat(note)
  
    response.json(note)
  })

 const PORT = 3001
 app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)   
 })