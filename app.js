require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient, ChangeStream, ObjectId } = require('mongodb')

const app = express()

// Conectando a base de dados
const client = new MongoClient(process.env.DB_URL)
const db = client.db('lab')



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials: true
}))


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem vindo ao servidor' })
})

app.post('/data', async (req, res) => {
    try {

        const { name, email } = req.body

        const doc = { _id: new ObjectId(), name, email }
        const data = await db.collection('user').insertOne(doc)
        res.status(200).json({ message: 'Usuário cadastrado à base de dados', userData: doc })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }
})

/**Rota para obter dados da base de dados */
app.get('/data', async (req, res) => {
    try {
        const data = await db.collection('pokemon').find().toArray()
        res.status(200).json({ data })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    } finally {
        // await client.close()
    }
})

app.get('/data/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await db.collection('pokemon').find({ _id: Number(id) }).toArray()
        res.status(200).json({ data })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }
})


client.connect()
    .then(() => console.log('Base conectada'))
    .catch(error => console.log(error))


module.exports = { app, client }