import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  CreateQuestionUseCaseRequestDTO,
  CreateQuestionUseCaseResponse,
} from './dto'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

export class CreateQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequestDTO): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      content,
      authorId: new UniqueEntityID(authorId),
      title,
    })

    await this.questionsRepository.create(question)

    return { question }
  }
}
