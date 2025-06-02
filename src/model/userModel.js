const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(name) {
            if (!name || name.length < 3) {
                throw new Error('users name should contain at least 3 characters')
            }
        }
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minLength: 7,
        validate(password) {
            if (!password || password.includes('password')) {
                throw new Error('Invalid password')
            }
        }
    }
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel