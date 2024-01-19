import { Answer } from "../entities/answer";
import { AnserQuestionUseCaseRequestDTO } from "./dto/answer-question-use-case-request";

export class AnswerQUestionUseCase {
    execute({instructorId, questionId, content}: AnserQuestionUseCaseRequestDTO) {
        const answer = new Answer(content)

        return answer
    }
}