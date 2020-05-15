import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleAnswerQuestion } from '../actions/questions';
import AvatarCard from './AvatarCard';
import {
    POSSIBLE_OPTIONS,
    PROPTYPE_SHAPE_USER,
    PROPTYPE_SHAPE_QUESTION,
} from '../constants';

class QuestionDetail extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        author: PropTypes.shape(PROPTYPE_SHAPE_USER).isRequired,
        question: PropTypes.shape(PROPTYPE_SHAPE_QUESTION).isRequired,
        authedUser: PropTypes.string.isRequired,
        userAnswer: PropTypes.oneOf(POSSIBLE_OPTIONS),
        dispatch: PropTypes.func.isRequired,
    }

    state = {
        answer: null,
    }

    onAnswerChange = (e) => {
        this.setState({
            answer: e.target.value,
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { dispatch, authedUser, id } = this.props;
        const { answer } = this.state;
        dispatch(handleAnswerQuestion(authedUser, id, answer));
    }

    render() {
        const { author, question, userAnswer } = this.props;
        const { answer } = this.state;

        if (question === null) {
            return <h1 className='center'>404. This poll doesn't exist</h1>
        }

        let totalVotes = 0
        POSSIBLE_OPTIONS.forEach(option => {
            totalVotes += question[option].votes.length;
        })

        return (
            <div className='center inner-container'>
                <h1>Would You Rather...</h1>
                <div className='card'>
                    <div className='card-left'>
                        <AvatarCard id={author.id}>
                            <p><strong>Author:</strong> {author.name}</p>
                        </AvatarCard>
                    </div>
                    {userAnswer !== null
                        ? (
                            <ul className='question-container'>
                                {POSSIBLE_OPTIONS.map(option => (
                                    <li
                                        key={option}
                                        className={userAnswer === option
                                            ? 'answer chosen'
                                            : 'answer'
                                        }
                                    >
                                        <p className='answer-text'>
                                            {question[option].text}
                                        </p>
                                        <p>
                                            {question[option].votes.length}/{totalVotes} votes
                                            ({Math.round(question[option].votes.length * 100 / totalVotes)}%)
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <form
                                onSubmit={this.onSubmit}
                                className='question-container middle'
                            >
                                {POSSIBLE_OPTIONS.map(option => (
                                    <div key={option} className='option'>
                                        <input
                                            type='radio'
                                            name='answer'
                                            id={option}
                                            value={option}
                                            checked={answer === option}
                                            onChange={this.onAnswerChange}
                                        />
                                        <label htmlFor={option}>
                                            {question[option].text}
                                        </label>
                                    </div>
                                ))}
                                <button
                                    className='btn'
                                    type='submit'
                                    disabled={answer === null}
                                >
                                    Submit
                                </button>
                            </form>
                        )
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
    const question = Object.keys(questions).includes(id)
        ? questions[id]
        : null;
    const author = question !== null
        ? users[question.author]
        : null;
    const userAnswers = Object.keys(users[authedUser].answers);
    const userAnswer = userAnswers.includes(id)
        ? users[authedUser].answers[id]
        : null

    return {
        author,
        question,
        authedUser,
        userAnswer,
    }
}

export default connect(mapStateToProps)(QuestionDetail);
