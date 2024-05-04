import { CheckIn } from '@prisma/client'
import { UseCase } from '.'
import { CheckInRepositories } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gym-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  gymLatitude: number
  gymLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase
  implements UseCase<CheckInUseCaseRequest, CheckInUseCaseResponse>
{
  constructor(
    private checkInRepository: CheckInRepositories,
    private GymsRepository: GymsRepository,
  ) {}

  async handle({ userId, gymId }: CheckInUseCaseRequest) {
    const gym = await this.GymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calculate gyn distance

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}