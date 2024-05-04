import { Gym } from '@prisma/client'

export interface GymsRepositories {
  // create(data: Prisma.UserCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
}
