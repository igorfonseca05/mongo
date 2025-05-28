const express = require('express')
const route = express.Router()

// Controllers das rota user
const { createUser, getUser } = require('../controller/userController')


route.get('/', getUser)
route.post('/', createUser)


module.exports = route