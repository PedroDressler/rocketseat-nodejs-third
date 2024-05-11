import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await supertest(app.server).post('/users').send({
    name: 'Pedro',
    email: 'pedro@email.com',
    password: 'pedro123',
  })

  const authResponse = await supertest(app.server).post('/sessions').send({
    email: 'pedro@email.com',
    password: 'pedro123',
  })

  const { token } = authResponse.body

  return { token }
}
