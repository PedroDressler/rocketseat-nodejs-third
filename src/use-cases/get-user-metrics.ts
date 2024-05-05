import { UseCase } from './use-case'
import { CheckInRepositories } from '@/repositories/check-ins-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase
  implements
    UseCase<GetUserMetricsUseCaseRequest, GetUserMetricsUseCaseResponse>
{
  constructor(private checkInRepository: CheckInRepositories) {}

  async handle({ userId }: GetUserMetricsUseCaseRequest) {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
