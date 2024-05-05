import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile'
import { hash } from 'bcrypt'
import { describe, it, expect, beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to find a user with id', async () => {
    const createdUser = await usersRepository.create({
      name: 'Pedro',
      email: 'pedro@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.handle({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toBe('Pedro')
  })

  it('should not be able to find a user with wrong id', async () => {
    expect(async () => {
      await sut.handle({
        userId: 'dawda',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
