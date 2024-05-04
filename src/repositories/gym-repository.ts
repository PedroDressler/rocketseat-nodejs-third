import { Gym } from '@prisma/client'

export interface GymsRepository {
  // create(data: Prisma.UserCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
}
