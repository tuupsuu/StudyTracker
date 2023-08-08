const request = require('supertest'); // Correct the import to 'supertest' instead of 'jest'
const jwt = require('jsonwebtoken');
const app = require('./index'); // Assuming your app is exported as 'app'
const crypto = require('crypto');

function generateRandomEmail() {
  const randomBytes = crypto.randomBytes(20).toString('hex');
  const timestamp = Date.now();
  const uniquePart = `${randomBytes}-${timestamp}`;
  const domain = 'example.com'; // Change this to your desired domain
  const email = `user-${uniquePart}@${domain}`;

  return email;
}

// Example usage:
const randomEmail = generateRandomEmail();
console.log(randomEmail);


describe('User Service API Endpoints', () => {
  // Mock data for testing
  const mockUser1 = { userID: 2, password: 'salasana2' };
  const mockUser = { FirstName: 'testUserMockF', LastName: 'testUserMockL', UserPassWord: 'testpassWDMock', Email: generateRandomEmail(), Rights: 10 };
  let authToken;
  let userId; // Define the userId variable to store the user ID obtained from login response

  // Test POST /users/login endpoint
  describe('POST /users/verify', () => {
    it('should return a JWT token upon successful login', async () => {
      const response = await request(app).post('/users/verify').send(mockUser1);
      console.log(response.body)
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');

      // Save the JWT token for use in other requests
      authToken = response.body.token;
    });
  });

  // Test GET /users endpoint
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const response = await request(app).get('/users').set('Authorization', `Bearer ${authToken}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test POST /users endpoint
  describe('POST /users', () => {
    it('should add a new user', async () => {
      const response = await request(app).post('/users').send(mockUser).set('Authorization', `Bearer ${authToken}`);
      console.log(response.body)
      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          userID: expect.any(Number),
        })
      );
      expect(response.body).toHaveProperty('userID');

      // Save the newly created user's ID for use in other requests
      userId = response.body.userID;
    });
  });

  // Test PUT /users/:id endpoint
  describe(`PUT /users/:${userId}`, () => { // Use the userId obtained from the POST request
    it('should update an existing user', async () => {
      const updatedUserData = { FirstName: 'aaatestUserMockF', LastName: 'ssstestUserMockL', UserPassWord: 'ffftestpassWDMock', Email: generateRandomEmail(), Rights: 101 };
      const response = await request(app).put(`/users/${userId}`).send(updatedUserData).set('Authorization', `Bearer ${authToken}`);
      console.log(response.body)
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });

  // Test DELETE /users/:id endpoint
  describe(`DELETE /users/:${userId}`, () => { // Use the userId obtained from the POST request
    it('should delete an existing user', async () => {
      const response = await request(app).delete(`/users/${userId}`).set('Authorization', `Bearer ${authToken}`);
      console.log(response.body)
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });

  afterAll((done) => {
    app.close(() => {
      console.log('Server closed');
      done();
    });
  });
});
