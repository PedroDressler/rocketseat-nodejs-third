import { Prisma, User } from '@prisma/client'

type UserType = Prisma.UserCreateInput

export interface UsersRepositories {
  create(data: UserType): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
