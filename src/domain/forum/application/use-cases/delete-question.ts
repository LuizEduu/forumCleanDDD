import { DeleteQuestionUseCaseRequestDTO } from './dto'
import { QuestionsRepository } from '../repositories/questions-repository'

export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequestDTO): Promise<void> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found!')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.questionsRepository.delete(question)
  }
}
