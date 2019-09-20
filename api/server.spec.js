const request = require('supertest');

const server = require('./server');
const db = require('../database/dbConfig');
const bcrypt = require('bcrypt')


describe('server', () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe('POST /api/auth/register', () => {
    it('should return 201 status', () => {
      return request(server).post('/api/auth/register')
        .send({
          username: "tommy",
          password: "password2"
        })
        .set('Content-Type', 'application/json')
        .then(res => {
          expect(res.status).toBe(201)
          expect(res.body.username).toBe('tommy')
        })
    })

    it('username should be {Name}', () => {
      return request(server).post('/api/auth/register')
        .send({
          username: "newreg",
          password: "admin3"
        })
        .set('Content-Type', 'application/json')
        .then(res => {
          expect(res.status).toBe(201)
          // expect(res.body.username).toBe('newreg')
        })
    })
  })
});

describe('POST /api/auth/login', () => {
  it('should return 200 status', () => {
  })
  it('Token should exist', async () => {
    // await db.seed.run()
    await db('users').insert([
      { username: "admin", password: bcrypt.hashSync("admin", 16) },
      { username: "testuser", password: bcrypt.hashSync("test", 16) }
    ])
    const res = await request(server).post('/api/auth/login')
      .send({
        username: "admin",
        password: "admin"
      })
      .set('Content-Type', 'application/json')
    expect(res.status).toBe(200)
    expect(res.body.token).toBeTruthy()
  })
})

describe('GET /api/jokes', () => {
  it('Returns json OK', () => {
    return request(server).get('/api/jokes')
      .expect('Content-Type', /json/)
  });

  it('Should Return 200 Status', () => {
    return request(server).get('/api/jokes')
      .set('authorization', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTY5MDAwMTEyLCJleHAiOjE1NjkwODY1MTJ9.1KRfrBcnCeQkLa2iGXfuBw1k1DK6gXsgkVkzFq1QwD0`)
      .then(res => {
        expect(res.status).toBe(200)
      })
  })

})