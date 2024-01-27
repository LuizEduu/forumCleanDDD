import { AnswersRepository } from '../repositories/answers-repository'
import { DeleteAnswerUseCaseRequestDTO } from './dto/delete-answer-request'

export class DeleteAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequestDTO): Promise<void> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found!')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(answer)
  }
}
