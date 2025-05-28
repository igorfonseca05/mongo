const request = require('supertest')

const { app, mongoose } = require('../../app')
const TaskModel = require('../model/taskModel')

const id = new mongoose.Types.ObjectId()

const task = {
    _id: id,
    description: 'Today i have to clean the house',
    isCompleted: false
}

beforeEach(async () => {
    await TaskModel.deleteMany({})
    await TaskModel.create(task)
})


describe('API task tests', () => {

    test('it should create a new task', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({
                description: 'Do the laundry',
                isCompleted: false
            })
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ message: 'Task has been created' })
    })

    test('is should to return the document', async () => {
        const res = await request(app)
            .get(`/tasks/${id}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.doc.description).toEqual('today i have to clean the house')
    })

})


afterAll(async () => {
    await mongoose.connection.close()
})