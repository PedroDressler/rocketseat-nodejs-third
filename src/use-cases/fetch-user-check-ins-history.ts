import { CheckIn } from '@prisma/client'
import { UseCase } from './use-case'
import { CheckInRepositories } from '@/repositories/check-ins-repository'

interface FetchUserCheckInsHistoryRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistory
  implements
    UseCase<FetchUserCheckInsHistoryRequest, FetchUserCheckInsHistoryResponse>
{
  constructor(private checkInRepository: CheckInRepositories) {}

  async handle({ userId, page }: FetchUserCheckInsHistoryRequest) {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
