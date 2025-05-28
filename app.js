require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const UserModel = require('./src/model/userModel')

const app = express()

// Conectando a base de dados
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database connnected'))
    .catch((error) => console.log(error.message))



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
        const newUser = new UserModel(req.body)

        try {
            await newUser.save()
            res.status(200).json({ message: 'User storaged to the database' })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }
})

/**Rota para obter dados da base de dados */
app.get('/data', async (req, res) => {
    try {
        const user = await UserModel.find()

        if (!user) {
            throw new Error('user not found')
        }

        res.status(200).json({ user })

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

module.exports = { app, mongoose }