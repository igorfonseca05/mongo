const request = require('supertest')
const { app, mongoose } = require('../../app')
const userModel = require('../model/userModel')

/** here we delete all documents from the database before
 *the test
 */
beforeEach(async () => {
    await userModel.deleteMany({})
})

/** This test is responsible for add new user to the database */
test('it should to add a new user', async () => {
    const res = await request(app)
        .post('/data')
        .send({
            name: 'Carlos',
            email: 'carlos@gmail.com'
        })
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ message: 'User storaged to the database' })
})

test('it should get the users that have been added to the database', async () => {
    const res = await request(app)
        .get('/data')
    expect(res.statusCode).toBe(200)
})

afterAll(async () => {
    await mongoose.connection.close()
})

