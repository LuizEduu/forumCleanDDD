import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { DeleteQuestionCommentUseCaseRequestDTO } from './dto'

export class DeleteQuestionCommentUseCase {
  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequestDTO): Promise<void> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question comment not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('not allowed')
    }

    await this.questionCommentsRepository.delete(questionComment)
  }
}
