import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  private questionComments: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.questionComments.push(questionComment)
  }
}
