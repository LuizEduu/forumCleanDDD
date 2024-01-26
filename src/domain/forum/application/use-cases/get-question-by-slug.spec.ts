import { QuestionsRepository } from '../repositories/questions-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: QuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question by slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to a question', async () => {
    const createdQuestion = makeQuestion({
      slug: Slug.create('javascript-question-with-arrays'),
    })

    await inMemoryQuestionsRepository.create(createdQuestion)

    const { question } = await sut.execute({
      slug: 'javascript-question-with-arrays',
    })

    expect(question.authorId).toBeTruthy()
    expect(question.id).toBeTruthy()
    expect(question.content).toEqual(createdQuestion.content)
    expect(question.title).toEqual(createdQuestion.title)
    expect(question.slug.value).toEqual(createdQuestion.slug.value)
  })

  it('shoud be able to throws error with question not found', async () => {
    expect(async () => {
      await sut.execute({
        slug: 'question-not-exists',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
