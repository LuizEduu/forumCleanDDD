import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: AnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create a answer', async () => {
    const { isLeft, isRight, value } = await sut.execute({
      questionId: '1',
      instructorId: '2',
      content: 'Nova resposta',
    })

    expect(isRight()).toBe(true)
    expect(isLeft()).toBe(false)
    expect(value?.answer.id).toBeTruthy()
  })
})
