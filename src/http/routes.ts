import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.con'
import { authenticate } from './controllers/authenticate.con'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
