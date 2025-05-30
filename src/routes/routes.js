const express = require('express')

const routes = express.Router()

const users = require('./users')
const tasks = require('./tasks')


routes.use('/users', users)
routes.use('/tasks', tasks)


routes.use('', (req, res) => {
    res.status(404).send({ message: 'Route not found' })
})


module.exports = routes