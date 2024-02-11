import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments'

export interface FetchQuestionCommentsUseCaseResponseDTO {
  questionComments: QuestionComment[]
}
