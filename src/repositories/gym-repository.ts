import { Prisma, Gym } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepositories {
  create(data: Prisma.GymCreateInput): Promise<Gym>

  findById(id: string): Promise<Gym | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>

  searchMany(query: string, page: number): Promise<Gym[]>
}
