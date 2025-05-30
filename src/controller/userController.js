const UserModel = require('../model/userModel')


exports.createUser = async (req, res) => {
    try {
        const newUser = new UserModel(req.body)

        try {
            await newUser.save()
            res.status(200).json({ message: 'User storaged to the database', user: newUser })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find()

        if (!users) {
            throw new Error('user not found')
        }

        res.status(200).json({ users })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }
}

exports.getUserById = async (req, res) => {
    const _id = req.params.id

    try {
        const user = await UserModel.findById(_id)

        if (!user) {
            throw new Error('user not found')
        }
        res.status(200).json({ user })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }
}


exports.updateUserData = async (req, res) => {
    const userSentFields = Object.keys(req.body)
    const userModelFields = ['name', 'email', 'password']

    const fieldsAreEqual = userSentFields.every((field) => userModelFields.includes(field))

    if (!fieldsAreEqual) throw new Error('Unknown field')

    try {
        const id = req.params.id
        const data = req.body

        const isUser = await UserModel.findById(id)

        if (!isUser) {
            throw new Error('User has not been found to update')
        }

        userSentFields.forEach(field => isUser[field] = data[field])
        await isUser.save()
        res.status(200).json({ isUser })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id

        const doc = await UserModel.findByIdAndDelete(id)

        if (!doc) throw new Error('User not found')

        res.status(200).json({ message: 'User has been deleted', userData: doc })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}