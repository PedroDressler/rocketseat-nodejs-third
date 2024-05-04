import { GymsRepositories } from '../gym-repository'
import { Gym } from '@prisma/client'

export class InMemoryGymsRepository implements GymsRepositories {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
