import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comments'

export interface FetchAnswerCommentsUseCaseResponseDTO {
  answerComments: AnswerComment[]
}
