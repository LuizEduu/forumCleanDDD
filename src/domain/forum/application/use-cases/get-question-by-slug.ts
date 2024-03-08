import { right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import {
  GetQuestionBySlugUseCaseRequestDTO,
  GetQuestionBySlugUseCaseResponseDTO,
} from './dto'

export class GetQuestionBySlugUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequestDTO): Promise<GetQuestionBySlugUseCaseResponseDTO> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    return right({
      question,
    })
  }
}
