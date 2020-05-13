import { RECEIVE_USERS } from '../actions/users';
import { ANSWER_QUESTION, CREATE_QUESTION } from '../actions/questions';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            }

        case ANSWER_QUESTION:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.id]: action.answer,
                    }
                }
            }

        case CREATE_QUESTION:
            return {
                ...state,
                [action.author]: {
                    ...state[action.author],
                    questions: state[action.author].questions.concat(
                        [action.question.id]
                    ),
                }
            }

        default:
            return state;
    }
}
