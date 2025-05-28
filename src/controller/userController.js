const UserModel = require('../model/userModel')


exports.getUser = async (req, res) => {
    try {
        const users = await UserModel.find()

        if (!users) {
            throw new Error('user not found')
        }

        res.status(200).json({ users })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    } finally {
        // await client.close()
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


exports.createUser = async (req, res) => {
    try {
        const newUser = new UserModel(req.body)

        try {
            await newUser.save()
            res.status(200).json({ message: 'User storaged to the database' })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }
}