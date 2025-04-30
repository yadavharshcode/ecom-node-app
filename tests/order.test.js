const request = require('supertest');
const app = require('../server');

describe('Order API', () => {
  it('should require authentication', async () => {
    const res = await request(app).post('/api/orders');
    expect(res.statusCode).toEqual(401);
  });
});