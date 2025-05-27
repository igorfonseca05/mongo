const request = require('supertest')
const { app, client } = require('../../app')

/** here we delete all documents from the database before
 *the test
 */
beforeEach(async () => {
    const db = client.db('lab')
    await db.collection('user').deleteMany({})
})

/** This test is responsible for add new user to the database */
test('it should to add a new user', async () => {
    await request(app)
        .post('/data')
        .send({
            name: 'Carlos',
            email: 'carlos@gmail.com'
        })
        .expect(200)
})

test('it should get the users that have been added to the database', async () => {
    await request(app)
        .get('/data')
        .expect(200)
})

afterAll(async () => {
    await client.close()
})

