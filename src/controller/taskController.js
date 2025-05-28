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