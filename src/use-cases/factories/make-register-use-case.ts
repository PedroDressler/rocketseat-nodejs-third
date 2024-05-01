import { PrismaUserRepositories } from '@/repositories/prisma/prisma-users-repositories'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const userRepository = new PrismaUserRepositories()
  const registerUseCase = new RegisterUseCase(userRepository)

  return registerUseCase
}
