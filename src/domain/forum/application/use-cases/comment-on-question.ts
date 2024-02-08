import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comments'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import {
  CommentOnQuestionUseCaseRequestDTO,
  CommentOnQuestionUseCaseResponseDTO,
} from './dto'

export class CommentOnQuestionUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequestDTO): Promise<CommentOnQuestionUseCaseResponseDTO> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return {
      questionComment,
    }
  }
}
