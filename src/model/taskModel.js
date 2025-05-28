const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(title) {
            if (!title || title.length <= 2) {
                throw new Error('Title description is required and should contain at least 3 characters')
            }
        }
    },
    description: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(description) {
            if (!description) {
                throw new Error('Description is required')
            }
        }
    }
})

const UserModel = mongoose.model('user', taskSchema)

module.exports = UserModel