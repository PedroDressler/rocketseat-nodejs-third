import { it, describe, beforeAll, afterAll, expect, beforeEach } from 'vitest'
import { app } from '@/app'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcrypt'
import { InMemoryUsersRepositories } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepositories
let sut: RegisterUseCase

describe('users route', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepositories()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should register a user', async () => {
    const { user } = await sut.handle({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123johndoe',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.handle({
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
    const email = 'john.doe@email.com'

    await sut.handle({
      name: 'John Doe',
      email,
      password: '123johndoe',
    })

    expect(async () => {
      await sut.handle({
        name: 'John Doe2',
        email,
        password: '123johndoe2',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
