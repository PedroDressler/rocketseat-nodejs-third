import { Gym } from '@prisma/client'
import { UseCase } from './use-case'
import { GymsRepositories } from '@/repositories/gym-repository'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase
  implements
    UseCase<FetchNearbyGymsUseCaseRequest, FetchNearbyGymsUseCaseResponse>
{
  constructor(private gymsRepository: GymsRepositories) {}

  async handle({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
