const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const dotenv = require('dotenv')
const contactRoute = require('./routes/contacts')
const cors = require('cors')
dotenv.config()

// Connecting to Mongo Database server
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to Mongo DB YAY')
    })

// Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())


app.use('/api/contacts', contactRoute)

// app.get('/', (req, res) => {
//     res.send("Welcome to homepage!")
// })

// app.get('/users', (req, res) => {
//     res.send("Welcome to users page!")
// })


// Creating a Express Runtime server
app.listen(8800, () => {
    console.log('Server has started!')
})