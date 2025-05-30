const express = require('express')
const route = express.Router()

// Controllers das rota user
const {
    createUser,
    getUsers,
    getUserById,
    updateUserData,
    deleteUserById } = require('../controller/userController')


route.post('/', createUser)
route.get('/', getUsers)
route.get('/:id', getUserById)
route.patch('/:id', updateUserData)
route.delete('/:id', deleteUserById)


module.exports = route