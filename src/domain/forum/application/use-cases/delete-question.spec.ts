import { QuestionsRepository } from '../repositories/questions-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryQuestionsRepository: QuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    const findQuestion = await inMemoryQuestionsRepository.findById(
      newQuestion.id.toString(),
    )

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    expect(findQuestion).toEqual(null)
  })

  it('should not be able to delete a question with question not found', async () => {
    const result = await sut.execute({
      questionId: 'question-not-found-id',
      authorId: 'question-not-found-author',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to delete a question the another author', async () => {
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: 'question-not-found-id',
      authorId: 'question-not-found-author',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
