import { FastifyReply, FastifyRequest } from 'fastify'

export type RoleType = 'ADMIN' | 'MEMBER'

export function verifyUserRole(roleToVewrify: RoleType) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== roleToVewrify) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
