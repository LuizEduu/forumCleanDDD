import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  private answers: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.answers.find((answer) => answer.id.toString() === id)

    return answer ?? null
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.answers.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )

    this.answers.splice(index, 1)
  }
}
