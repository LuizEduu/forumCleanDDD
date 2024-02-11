import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { DeleteAnswerCommentUseCaseRequestDTO } from './dto'

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequestDTO): Promise<void> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)
  }
}
