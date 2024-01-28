import { QuestionsRepository } from '../repositories/questions-repository'
import { EditQuestionUseCaseRequestDTO } from './dto'

export class EditQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
    questionId,
  }: EditQuestionUseCaseRequestDTO): Promise<void> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found!')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.create(question)
  }
}
