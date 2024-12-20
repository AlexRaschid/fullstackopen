const express = require('express')
const app = express()
var morgan = require('morgan')

morgan.token('POST-body', (req) => JSON.stringify(req.body));
const formatString = ':method :url :status :res[content-length] - :response-time ms :POST-body';

app.use(morgan(formatString));
//app.use(morgan('tiny'))
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
    const person = phonebook.find(person => person.id === id)

    /*
        Ik course says "For the sake of simplicity, our application will respond with 204 in both cases."
        But I think it is better to return 404 if the person is not found
        After here ill continue to use 202 as the course says    
    */
    if (person){
        phonebook = phonebook.filter(note => note.id !== id)
        console.log(`successfully deleted ${id}`)
        response.status(204).end()
    } else {
        console.log(`Person id: ${id} is not found, try again`)
        response.status(404).end()
    }
    //console.log(id)
  })


  const generateId = () => {
    const maxId = phonebook.length > 0
      ? Math.max(...phonebook.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name || !body.number) {
        return response.status(404).json({ 
            error: 'name or number missing' 
        });
    } 
    else if(phonebook.find( person => person.name === body.name)){
        return response.status(404).json({ 
            error: 'name must be unique' 
        });
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    phonebook = phonebook.concat(person)
  
    response.json(person)
  })

 const PORT = 3001
 app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)   
 })