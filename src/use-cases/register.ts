import crypto from 'bcryptjs'
import { UsersRepositories } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserParams {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepositories) {}

  async handle({ name, email, password }: RegisterUserParams) {
    const password_hash = await crypto.hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.userRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
