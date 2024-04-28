import crypto from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface RegisterUserParams {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private userRepository: any) {}

  async handle({ name, email, password }: RegisterUserParams) {
    const passwordHash = await crypto.hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('⚠️ Email already in use')
    }

    await this.userRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
