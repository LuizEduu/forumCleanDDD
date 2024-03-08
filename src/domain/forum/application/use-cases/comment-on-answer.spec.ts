import { CommentOnAnswerUseCase } from './comment-on-answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: AnswersRepository
let inMemoryAnswerCommentsRepository: AnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('CommentOnAnswer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('shoud be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    const { isLeft, isRight, value } = await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentário teste na resposta',
    })

    expect(answerComment.content).toEqual('Comentário teste na resposta')
    expect(answerComment.authorId.toString()).toEqual(
      answer.authorId.toString(),
    )
  })

  it('shoud not be able to comment on answer when answer not found', async () => {
    expect(async () => {
      await sut.execute({
        answerId: 'answer_not_found_id',
        authorId: 'any_author_id',
        content: 'Comentário teste na resposta',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
