import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'Pedro',
      email: 'pedro@email.com',
      password_hash: await hash('pedro123', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await supertest(app.server).post('/sessions').send({
    email: 'pedro@email.com',
    password: 'pedro123',
  })

  const { token } = authResponse.body

  return { token }
}
