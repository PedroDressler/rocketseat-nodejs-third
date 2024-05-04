import { User } from '@prisma/client'
import { UseCase } from './use-case'
import { UsersRepositories } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase
  implements
    UseCase<GetUserProfileUseCaseRequest, GetUserProfileUseCaseResponse>
{
  constructor(private userRepository: UsersRepositories) {}

  async handle({ userId }: GetUserProfileUseCaseRequest) {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
