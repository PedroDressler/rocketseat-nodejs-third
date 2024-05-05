import { PrismaUserRepositories } from '@/repositories/prisma/prisma-users-repositories'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const userRepository = new PrismaUserRepositories()
  const useCase = new GetUserProfileUseCase(userRepository)

  return useCase
}
