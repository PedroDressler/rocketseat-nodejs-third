import { app } from '@/app'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from '@/use-cases/check-in'
import { Decimal } from '@prisma/client/runtime/library'
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  vi,
  afterEach,
} from 'vitest'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('get user profile route', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check-in', async () => {
    await gymsRepository.items.push({
      id: 'gym-01',
      name: 'JS Gym',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      description: '',
      phone: '123',
    })

    const { checkIn } = await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      gymLatitude: 0,
      gymLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      gymLatitude: 0,
      gymLongitude: 0,
    })

    expect(async () => {
      await sut.handle({
        gymId: 'gym-01',
        userId: 'user-01',
        gymLatitude: 0,
        gymLongitude: 0,
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check-in in the same day buy different year', async () => {
    vi.setSystemTime(new Date(2021, 0, 20, 8, 0, 0))

    await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      gymLatitude: 0,
      gymLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      gymLatitude: 0,
      gymLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      gymLatitude: 0,
      gymLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      gymLatitude: 0,
      gymLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
