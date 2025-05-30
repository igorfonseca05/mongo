const request = require('supertest')
const { app, mongoose } = require('../../app')
// const userModel = require('../model/userModel')
const UserModel = require('../model/userModel')

/** here we delete all documents from the database before
 *the test
 */

const id = new mongoose.Types.ObjectId()

const user = {
    _id: id,
    name: 'Murilo',
    email: "Murilo@gmail.com",
    password: '12345678'
}


beforeEach(async () => {
    await UserModel.deleteMany({})
    await (new UserModel(user)).save()
})

/** This test is responsible for add new user to the database */
test('it should to add a new user', async () => {
    const res = await request(app)
        .post('/users')
        .send({
            name: 'Carlos',
            email: 'carlos@gmail.com',
            password: "1234567"
        })
    expect(res.statusCode).toBe(200)
    // expect(res.body).toEqual({ message: 'User storaged to the database' })
})

test('it should get the users that have been added to the database', async () => {
    const res = await request(app)
        .get('/users')
    expect(res.statusCode).toBe(200)
})

test('get user By Id', async () => {
    const res = await request(app)
        .get(`/users/${id}`)
    expect(res.status).toBe(200)
})

test('It should to update UserData', async () => {
    const res = await request(app)
        .patch(`/users/${id}`)
        .send({
            name: 'Marina'
        })
    expect(res.statusCode).toBe(200)
})

test('It should to delete user', async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
    expect(res.statusCode).toBe(200)
})

afterAll(async () => {
    await mongoose.connection.close()
})

