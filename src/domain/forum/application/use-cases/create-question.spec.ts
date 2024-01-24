import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const questionsRepository: QuestionsRepository = {
  create: async () => {
    'executed'
  },
}

describe('Create Question Use Case', () => {
  it('should be able to a new question', async () => {
    const createQuestionUseCase = new CreateQuestionUseCase(questionsRepository)

    const { question } = await createQuestionUseCase.execute({
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
