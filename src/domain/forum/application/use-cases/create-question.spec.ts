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
    const { question } = await sut.execute({
      authorId: '1',
      content: 'nova questão',
      title: 'Nova questão title',
    })

    expect(question.authorId.toString()).toEqual('1')
    expect(question.id).toBeTruthy()
    expect(question.content).toEqual('nova questão')
    expect(question.title).toEqual('Nova questão title')
  })
})
