import { Either } from '@/core/either'
import { Question } from '@/domain/forum/enterprise/entities/question'

export type GetQuestionBySlugUseCaseResponseDTO = Either<
  null,
  {
    question: Question
  }
>
