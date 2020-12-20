const request = require('supertest');
const server = require('../src/server.js');
const prisma = require('../src/models/prisma.js');

let test_create_user_input = {
    "name": "Pedro Test",
    "email": "pedro@pedro.com",
    "birthDate": "03-07-1985",
    "address": {
        "street": "123 Main Street",
        "state": "New York",
        "city": "NY",
        "country": "US",
        "zip": "10030"
    }
};

let created_user;

// close prisma connection after all tests
afterAll(async () => {
    await prisma.$disconnect();
});

test('should return an array GET /users/getusers', async () => {
    const response = await request(server.callback()).get('/users/getusers');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
});

test('should create a user POST /users/createUsers', async () => {
    const response = await request(server.callback()).post('/users/createUsers').send(test_create_user_input);
    expect(response.status).toEqual(201);
    expect(typeof response.body.id === "number").toBeTruthy();
    expect(typeof response.body.address.id === "number").toBeTruthy();
    created_user = response.body;
});

test('should throw invalid input if data is not valid POST /users/createUsers', async () => {
    const response = await request(server.callback()).post('/users/createUsers').send({
        "name": "Pedro Test",
        "email": "pedro@pedro.com",
        "birthDate": "this_is_not_a_date",
        "address": {
            "street": "123 Main Street",
            "state": "New York",
            "city": "NY",
            "country": "US",
            "zip": "10030"
        }
    })
    expect(response.status).toEqual(405);
    expect(response.text).toEqual('Invalid input');
});

test('should return a user by id GET /users/getusersById/{userId}', async () => {
    const response = await request(server.callback()).get('/users/getusersById/'+created_user.id);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(created_user);
});

test('should return 400 if invalid user id GET /users/getusersById/{userId}', async () => {
    let invalid_user_id = 'abc';
    const response = await request(server.callback()).get('/users/getusersById/'+invalid_user_id);
    expect(response.status).toEqual(400);
    expect(response.text).toEqual('Invalid user id');
});

test('should return 404 if user not found GET /users/getusersById/{userId}', async () => {
    let user_id = 99999;
    const response = await request(server.callback()).get('/users/getusersById/'+user_id);
    expect(response.status).toEqual(404);
    expect(response.text).toEqual('User not found');
});

test('should update a user PUT /users/updateUsersById/{userId}', async () => {
    const response = await request(server.callback()).put('/users/updateUsersById/'+created_user.id).send(created_user);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(created_user);
});

test('should return 400 if invalid user id PUT /users/updateUsersById/{userId}', async () => {
    let invalid_user_id = 'abc';
    const response = await request(server.callback()).put('/users/updateUsersById/'+invalid_user_id).send(created_user);
    expect(response.status).toEqual(400);
    expect(response.text).toEqual('Invalid user id');
});

test('should return 404 if user not found PUT /users/updateUsersById/{userId}', async () => {
    let user_id = 99999;
    const response = await request(server.callback()).put('/users/updateUsersById/'+user_id).send(created_user);
    expect(response.status).toEqual(404);
    expect(response.text).toEqual('User not found');
});

test('should delete a user by id DELETE /users/deleteUsersById/{userId}', async () => {
    const response = await request(server.callback()).delete('/users/deleteUsersById/'+created_user.id);
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('OK');
});

test('should return 400 if invalid user id DELETE /users/deleteUsersById/{userId}', async () => {
    let invalid_user_id = 'abc';
    const response = await request(server.callback()).delete('/users/deleteUsersById/'+invalid_user_id);
    expect(response.status).toEqual(400);
    expect(response.text).toEqual('Invalid user id');
});

test('should return 404 if user not found DELETE /users/deleteUsersById/{userId}', async () => {
    let user_id = 99999;
    const response = await request(server.callback()).delete('/users/deleteUsersById/'+user_id);
    expect(response.status).toEqual(404);
    expect(response.text).toEqual('User not found');
});

test('should return 404 if user was deleted DELETE /users/deleteUsersById/{userId}', async () => {
    const response = await request(server.callback()).delete('/users/deleteUsersById/'+created_user.id);
    expect(response.status).toEqual(404);
    expect(response.text).toEqual('User not found');
});