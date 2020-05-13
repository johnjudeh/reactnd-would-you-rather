import { saveQuestionAnswer, saveQuestion } from "../utils/api";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const CREATE_QUESTION = 'CREATE_QUESTION';

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

export function createQuestion(question, author) {
    return {
        type: CREATE_QUESTION,
        question,
        author,
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

export function handleCreateQuestion(optionOneText, optionTwoText, author) {
    return (dispatch) => {
        return saveQuestion(optionOneText, optionTwoText, author)
            .then(question => {
                dispatch(createQuestion(question, author));
            });
    }
}
