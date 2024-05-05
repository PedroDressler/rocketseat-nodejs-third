import { CheckIn } from '@prisma/client'
import { UseCase } from './use-case'
import { CheckInRepositories } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase
  implements
    UseCase<ValidateCheckInUseCaseRequest, ValidateCheckInUseCaseResponse>
{
  constructor(private checkInRepository: CheckInRepositories) {}

  async handle({ checkInId }: ValidateCheckInUseCaseRequest) {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
