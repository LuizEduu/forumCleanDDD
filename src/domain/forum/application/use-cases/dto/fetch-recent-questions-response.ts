import { Question } from '@/domain/forum/enterprise/entities/question'

export interface FetchRecentQuestionsUseCaseResponseDTO {
  questions: Question[]
}
