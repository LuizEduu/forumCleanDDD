import { QuestionsRepository } from '../repositories/questions-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: QuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 27),
      }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 28),
      }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 29),
      }),
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions).toHaveLength(3)
    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 29) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 28) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 27) }),
    ])
  })

  it('shoud be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions).toHaveLength(2)
  })
})