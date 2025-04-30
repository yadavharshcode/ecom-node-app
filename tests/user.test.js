const request = require('supertest');
const app = require('../server');

describe('User API', () => {
  it('should require authentication', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(401);
  });
});