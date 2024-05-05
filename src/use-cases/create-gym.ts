import { Gym } from '@prisma/client'
import { UseCase } from './use-case'
import { GymsRepositories } from '@/repositories/gym-repository'

interface CreateGymUseCaseRequest {
  name: string
  description: string | null
  phone: string
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase
  implements UseCase<CreateGymUseCaseRequest, CreateGymUseCaseResponse>
{
  constructor(private gymsRepository: GymsRepositories) {}

  async handle({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
