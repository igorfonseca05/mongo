require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient, ChangeStream, ObjectId } = require('mongodb')

const app = express()

// Conectando a base de dados
const client = new MongoClient(process.env.DB_URL)
const db = client.db('automatic')
// const collection = db.collection('pokemon')


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

        // res.end()

        const data = await db.collection('pokemon').find({ _id: Number(id) }).toArray()
        res.status(200).json({ data })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    } finally {
        // await client.close()
    }
})




client.connect()
    .then(() =>
        app.listen(5000, () => {
            console.log('Base de dados conectada com sucesso')
            console.log('Servidor on')
            console.log('Acesse em http://localhost:5000')
        }))
    .catch(error => console.log(error))




