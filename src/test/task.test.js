const request = require('supertest')

const { app, mongoose } = require('../../app')



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

})


afterAll(async () => {
    await mongoose.connection.close()
})