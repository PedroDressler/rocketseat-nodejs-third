import { Gym } from '@prisma/client'
import { UseCase } from './use-case'
import { GymsRepositories } from '@/repositories/gym-repository'

interface SearchGymUseCaseRequest {
  query: string
  page: number
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase
  implements UseCase<SearchGymUseCaseRequest, SearchGymUseCaseResponse>
{
  constructor(private gymsRepository: GymsRepositories) {}

  async handle({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
