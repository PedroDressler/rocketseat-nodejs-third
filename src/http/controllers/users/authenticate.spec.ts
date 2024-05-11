import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import supertest from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await supertest(app.server).post('/users').send({
      name: 'Pedro',
      email: 'pedro@email.com',
      password: 'pedro123',
    })

    const response = await supertest(app.server).post('/sessions').send({
      email: 'pedro@email.com',
      password: 'pedro123',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
