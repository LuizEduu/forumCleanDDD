import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private questions: Question[] = []

  async create(question: Question) {
    this.questions.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find(
      (question) => question.slug.value === slug,
    )

    return question ?? null
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.questions.find(
      (question) => question.id.toString() === id,
    )

    return question ?? null
  }

  async delete(question: Question) {
    const index = this.questions.findIndex((item) => item.id === question.id)

    this.questions.splice(index, 1)
  }

  async save(question: Question) {
    const index = this.questions.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    )

    this.questions[index] = question
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    return this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }
}
