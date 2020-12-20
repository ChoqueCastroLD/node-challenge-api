## Node Challenge API


Postman reference:

> https://www.getpostman.com/collections/2821f1f6f0ead2d48d70

Note: In the postman reference replace {{base_url}} with the base_url of the api Eg. https://api.users.es

# Setup

1. Create .env file

Example:

```
PORT=3000
SECRET=abc-123
BASE_URL=http://localhost:3000

DB_HOST=localhost
DB_DATABASE=nodechallenge
DB_USER=johndoe
DB_PASSWORD=randompassword

DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/nodechallenge"
```

2. Install dependencies

> npm install

3. Run Migrations

> npm run migration:up

Note: Must have a valid mysql / mariadb server

# Execute / Start server

> npm start

# Run Tests

> npm test

Note: Tests require that migrations were run

Expected test results

```
 PASS  tests/routes.test.js
  ✓ should return an array GET /users/getusers (207 ms)
  ✓ should create a user POST /users/createUsers (122 ms)
  ✓ should throw invalid input if data is not valid POST /users/createUsers (10 ms)
  ✓ should return a user by id GET /users/getusersById/{userId} (15 ms)
  ✓ should return 400 if invalid user id GET /users/getusersById/{userId} (11 ms)
  ✓ should return 404 if user not found GET /users/getusersById/{userId} (9 ms)
  ✓ should update a user PUT /users/updateUsersById/{userId} (17 ms)
  ✓ should return 400 if invalid user id PUT /users/updateUsersById/{userId} (6 ms)
  ✓ should return 404 if user not found PUT /users/updateUsersById/{userId} (10 ms)
  ✓ should delete a user by id DELETE /users/deleteUsersById/{userId} (18 ms)
  ✓ should return 400 if invalid user id DELETE /users/deleteUsersById/{userId} (6 ms)
  ✓ should return 404 if user not found DELETE /users/deleteUsersById/{userId} (9 ms)
  ✓ should return 404 if user was deleted DELETE /users/deleteUsersById/{userId} (12 ms)
```