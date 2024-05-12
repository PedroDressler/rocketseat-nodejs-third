import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import supertest from 'supertest'

describe('Refresh (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    await supertest(app.server).post('/users').send({
      name: 'Pedro',
      email: 'pedro@email.com',
      password: 'pedro123',
    })

    const authResponse = await supertest(app.server).post('/sessions').send({
      email: 'pedro@email.com',
      password: 'pedro123',
    })

    const cookies = authResponse.get('Set-Cookie')!

    const response = await supertest(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
