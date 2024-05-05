import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      name: 'Javascript Gym',
      latitude: 0,
      longitude: 0,
      phone: '',
      description: '',
    })

    await gymsRepository.create({
      name: 'Typescript Gym',
      latitude: 0,
      longitude: 0,
      phone: '',
      description: '',
    })

    const { gyms } = await sut.handle({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Javascript Gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Javascript Gym ${i}`,
        latitude: 0,
        longitude: 0,
        phone: '',
        description: '',
      })
    }

    const { gyms } = await sut.handle({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Javascript Gym 21' }),
      expect.objectContaining({ name: 'Javascript Gym 22' }),
    ])
  })
})
