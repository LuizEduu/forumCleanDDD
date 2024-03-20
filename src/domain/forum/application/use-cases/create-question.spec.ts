import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: QuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'nova questão',
      title: 'Nova questão title',
    })

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    result.isRight() &&
      expect(result.value.question.authorId.toString()).toEqual('1')
    result.isRight() && expect(result.value.question.id).toBeTruthy()
    result.isRight() &&
      expect(result.value.question.content).toEqual('nova questão')
    result.isRight() &&
      expect(result.value.question.title).toEqual('Nova questão title')
  })
})
