const express = require('express')


const route = express.Router()


const { createTask, getTaskById } = require('../controller/taskController')

route.post('/', createTask)
route.get('/:id', getTaskById)
route.get('/', () => { })
route.delete('/:id', () => { })
route.patch('/:id', () => { })



module.exports = route