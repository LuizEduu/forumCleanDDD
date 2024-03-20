import { DeleteAnswerUseCase } from './delete-answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryAnswersRepository: AnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
    })

    const findAnswer = await inMemoryAnswersRepository.findById(
      answer.id.toString(),
    )

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    expect(findAnswer).toEqual(null)
  })

  it('should not be able to delete a answer with answer not found', async () => {
    const result = await sut.execute({
      answerId: 'not-found-id',
      authorId: 'author-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to delete a answer the another author', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'answer-not-found-author',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
