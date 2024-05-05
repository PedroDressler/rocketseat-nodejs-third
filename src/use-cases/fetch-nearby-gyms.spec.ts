import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      name: 'Near Gym',
      latitude: -19.712896,
      longitude: -44.0420834,
      phone: null,
      description: null,
    })

    await gymsRepository.create({
      name: 'Far Gym',
      latitude: -19.8833606,
      longitude: -44.5721368,
      phone: null,
      description: null,
    })

    const { gyms } = await sut.handle({
      userLatitude: -19.712827,
      userLongitude: -44.0420855,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near Gym' })])
  })
})
