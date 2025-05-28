const express = require('express')
const route = express.Router()

// Controllers das rota user
const { createUser, getUser, getUserById } = require('../controller/userController')


route.get('/', getUser)
route.get('/:id', getUserById)
route.post('/', createUser)
route.patch('/:id', () => { })
route.delete('/:id', () => { })


module.exports = route