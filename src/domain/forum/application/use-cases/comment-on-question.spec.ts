import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: QuestionsRepository
let inMemoryQuestionCommentsRepository: QuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('CommentOnQuestion Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('shoud be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    const { questionComment } = await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(questionComment.content).toEqual('Comentário teste')
    expect(questionComment.authorId.toString()).toEqual(
      question.authorId.toString(),
    )
  })

  it('shoud not be able to comment on question when question not found', async () => {
    expect(async () => {
      await sut.execute({
        questionId: 'question_not_found_id',
        authorId: 'any_author_id',
        content: 'Comentário teste',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
