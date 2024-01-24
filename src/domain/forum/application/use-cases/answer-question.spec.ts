import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'

const mockAnswersRepository: AnswersRepository = {
  create: async () => {
    'executed'
  },
}

describe('Answer Question Use Case', () => {
  it('should be able to create a answer', async () => {
    const answerQuestionUseCase = new AnswerQuestionUseCase(
      mockAnswersRepository,
    )

    const answer = await answerQuestionUseCase.execute({
      questionId: '1',
      instructorId: '2',
      content: 'Nova resposta',
    })

    expect(answer.content).toEqual('Nova resposta')
  })
})
