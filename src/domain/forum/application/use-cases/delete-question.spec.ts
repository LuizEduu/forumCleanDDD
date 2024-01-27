import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'

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

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    const findQuestion = await inMemoryQuestionsRepository.findById(
      newQuestion.id.toString(),
    )

    expect(findQuestion).toEqual(null)
  })

  it('should not be able to delete a question with question not found', async () => {
    expect(async () => {
      await sut.execute({
        questionId: 'question-not-found-id',
        authorId: 'question-not-found-author',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to delete a question the another author', async () => {
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(async () => {
      await sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'question-not-found-author',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
