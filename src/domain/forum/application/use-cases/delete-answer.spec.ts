import { DeleteAnswerUseCase } from './delete-answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

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

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
    })

    const findAnswer = await inMemoryAnswersRepository.findById(
      answer.id.toString(),
    )

    expect(findAnswer).toEqual(null)
  })

  it('should not be able to delete a answer with answer not found', async () => {
    expect(async () => {
      await sut.execute({
        answerId: 'not-found-id',
        authorId: 'author-id',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to delete a answer the another author', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswersRepository.create(newAnswer)

    expect(async () => {
      await sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'answer-not-found-author',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
