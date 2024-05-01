import { PrismaUserRepositories } from '@/repositories/prisma/prisma-users-repositories'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUserRepositories()
  const authenticateUseCase = new AuthenticateUseCase(userRepository)

  return authenticateUseCase
}
