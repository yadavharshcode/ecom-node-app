const request = require('supertest');
const app = require('../server');
const User = require('../models/mysql/user.model');

describe('Auth API', () => {
  beforeEach(async () => {
    await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('userId');
  });

  it('should login existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('accessToken');
  });
});