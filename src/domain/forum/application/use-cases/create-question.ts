import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  CreateQuestionUseCaseRequestDTO,
  CreateQuestionUseCaseResponseDTO,
} from './dto'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { right } from '@/core/either'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export class CreateQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseRequestDTO): Promise<CreateQuestionUseCaseResponseDTO> {
    const question = Question.create({
      content,
      authorId: new UniqueEntityID(authorId),
      title,
    })

    const questionAttachments = attachmentsIds.map((attachmentId) =>
      QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      }),
    )

    question.attachments = questionAttachments

    await this.questionsRepository.create(question)

    return right({
      question,
    })
  }
}
