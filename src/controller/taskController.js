const TaskModel = require('../model/taskModel')

exports.createTask = async (req, res) => {
    try {

        const task = new TaskModel(req.body)
        await task.save()

        res.status(200).json({ message: 'Task has been created' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


exports.getTaskById = async (req, res) => {
    try {

        const id = req.params.id
        const doc = await TaskModel.findById(id)

        if (!doc) {
            throw new Error('Document not found')
        }

        res.status(200).json({ doc })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }
}