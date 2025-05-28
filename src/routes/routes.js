const express = require('express')

const routes = express.Router()

const users = require('./users')
const task = require('./tasks')


routes.use('/user', users)
routes.use('/tasks', task)


routes.use('', (req, res) => {
    res.status(404).send({ message: 'Route not found' })
})


module.exports = routes