import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import { app } from '@/app'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepositories } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

describe('users route', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should register a user', async () => {
    const usersRepository = new InMemoryUsersRepositories()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.handle({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123johndoe',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepositories()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.handle({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123johndoe',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123johndoe',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not register a user when email is a duplicate', async () => {
    const usersRepository = new InMemoryUsersRepositories()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'john.doe@email.com'

    await registerUseCase.handle({
      name: 'John Doe',
      email,
      password: '123johndoe',
    })

    expect(async () => {
      await registerUseCase.handle({
        name: 'John Doe2',
        email,
        password: '123johndoe2',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
