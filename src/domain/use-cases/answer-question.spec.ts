import {describe, expect, it} from 'vitest'
import { AnswerQUestionUseCase } from './answer-question'

describe('Answer Question Use Case', () => {
    it('should be able to create a answer', () => {
        const answerQuestionUseCase = new AnswerQUestionUseCase()

        const answer = answerQuestionUseCase.execute({
            questionId: '1',
            instructorId: '2',
            content: 'Nova resposta'
        })
        
        expect(answer.content).toEqual('Nova Resposta')
    })
})