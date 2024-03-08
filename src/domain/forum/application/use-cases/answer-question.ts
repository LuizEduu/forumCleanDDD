import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import {
  AnserQuestionUseCaseRequestDTO,
  AnserQuestionUseCaseResponseDTO,
} from './dto'
import { Answer } from '../../enterprise/entities/answer'
import { right } from '@/core/either'

export class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnserQuestionUseCaseRequestDTO): Promise<AnserQuestionUseCaseResponseDTO> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return right({
      answer,
    })
  }
}
