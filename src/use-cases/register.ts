import { hash } from 'bcrypt'
import { UsersRepositories } from '@/repositories/users-repository'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists'
import { User } from '@prisma/client'
import { UseCase } from './use-case'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase
  implements UseCase<RegisterUseCaseRequest, RegisterUseCaseResponse>
{
  constructor(private userRepository: UsersRepositories) {}

  async handle({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new ResourceAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
