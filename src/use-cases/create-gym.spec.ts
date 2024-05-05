import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should register a gym', async () => {
    const { gym } = await sut.handle({
      name: 'Js Gym',
      description: 'Js Gym Academy',
      latitude: 0,
      longitude: 0,
      phone: '(31) 99999-9999',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
