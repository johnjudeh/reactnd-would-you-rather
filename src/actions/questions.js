import { saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function answerQuestion(authedUser, id, answer) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        id,
        answer,
    }
}

export function handleAnswerQuestion(authedUser, id, answer) {
    return (dispatch) => {
        return saveQuestionAnswer(authedUser, id, answer)
            .then(() => {
                dispatch(answerQuestion(authedUser, id, answer));
            })
    }
}
