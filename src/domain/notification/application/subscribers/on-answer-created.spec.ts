import { makeAnswer } from 'test/factories/make-answer'
import { OnAnswerCreated } from './on-answer-created'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'

let inMemoryAnswerAttachmentsRepository: AnswerAttachmentsRepository
let inMemoryAnswersRepository: AnswersRepository
let inMemoryQuestionAttachmentsRepository: QuestionAttachmentsRepository
let questionsRepository: QuestionsRepository
let notificationsRepository: NotificationsRepository
let sendNotification: SendNotificationUseCase
let sut: OnAnswerCreated

describe('on answer created', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()

    questionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )

    notificationsRepository = new InMemoryNotificationsRepository()

    sendNotification = new SendNotificationUseCase(notificationsRepository)

    sut = new OnAnswerCreated(questionsRepository, sendNotification)
  })
  it('shoud send a notification when an answer is created', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)
  })
})
