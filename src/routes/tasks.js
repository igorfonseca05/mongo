const express = require('express')


const route = express.Router()


const { createTask } = require('../controller/taskController')


route.post('/', createTask)



module.exports = route