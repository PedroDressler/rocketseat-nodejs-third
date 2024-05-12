import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import supertest from 'supertest'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await supertest(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Javascript Gym',
        description: 'Near Gym',
        phone: '31999999999',
        latitude: -20.0619908,
        longitude: -43.6793768,
      })

    const response = await supertest(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -20.0619908,
        longitude: -43.6793768,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'Javascript Gym',
      }),
    ])
  })
})
