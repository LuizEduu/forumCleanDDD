import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  CommentOnAnswerUseCaseRequestDTO,
  CommentOnAnswerUseCaseResponseDTO,
} from './dto'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comments'

export class CommentOnAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answersCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequestDTO): Promise<CommentOnAnswerUseCaseResponseDTO> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answersCommentsRepository.create(answerComment)

    return {
      answerComment,
    }
  }
}
