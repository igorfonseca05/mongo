const express = require('express')


const route = express.Router()


const {
    createTask,
    getTaskById,
    getAllTask,
    updateTask,
    deleteById } = require('../controller/taskController')

// Route to create a task
route.post('/', createTask)

// Route to get all tasks
route.get('/', getAllTask)

// Route to get a specific task by id
route.get('/:id', getTaskById)

// Route to modify task
route.patch('/:id', updateTask)

// Route to delete a task by its ID
route.delete('/:id', deleteById)



module.exports = route