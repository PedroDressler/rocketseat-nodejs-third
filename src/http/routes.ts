import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.con'
import { authenticate } from './controllers/authenticate.con'
import { profile } from './controllers/profile.con'
import { verifyJwt } from './controllers/middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
