const express = require("express")
const app = express()
const db = require("./db")

app.use(express.json())

console.log(db)

app.get('/', (req, res) => {
  res.send(`
    <div>
      <h1>Contactos</h1>
      <></>  
    </div>
    `)
})

app.get('/', (req, res) => {
    res.send('GET request to the homepage')
  })

app.delete('/', (req, res) => {
    res.send('GET request to the homepage')
})

app.post('/', (req, res) => {
    res.send('GET request to the homepage')
})

app.put('/', (req, res) => {
    res.send('GET request to the homepage')
})


const PORT = 3001;
app.listen(PORT)