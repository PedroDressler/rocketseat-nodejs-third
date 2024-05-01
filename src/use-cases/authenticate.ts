import { UsersRepositories } from '@/repositories/users-repository'
import { UseCase } from '.'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcrypt'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase
  implements UseCase<AuthenticateUseCaseRequest, AuthenticateUseCaseResponse>
{
  constructor(private userRepository: UsersRepositories) {}
  async handle({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
