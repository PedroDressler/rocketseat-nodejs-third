import { Prisma, Gym } from '@prisma/client'

export interface GymsRepositories {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
}
