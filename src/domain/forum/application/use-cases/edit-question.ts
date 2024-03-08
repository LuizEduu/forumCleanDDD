import { left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import {
  EditQuestionUseCaseRequestDTO,
  EditQuestionUseCaseResponseDTO,
} from './dto'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

export class EditQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
    questionId,
  }: EditQuestionUseCaseRequestDTO): Promise<EditQuestionUseCaseResponseDTO> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionsRepository.create(question)

    return right({
      question,
    })
  }
}
