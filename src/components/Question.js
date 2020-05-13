import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/questions';

class Question extends Component {
    static POSSIBLE_ANSWERS = ['optionOne', 'optionTwo'];

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

        let totalVotes = 0
        Question.POSSIBLE_ANSWERS.forEach(option => {
            totalVotes += question[option].votes.length;
        })

        return (
            <div className='center'>
                <h1>Would You Rather...</h1>
                <div className='user-card'>
                    <div className='avatar-container'>
                        <img
                            src={author.avatarURL}
                            className='avatar'
                            alt={`Avatar of ${author.name}`}
                        />
                        <p><strong>Author:</strong> {author.name}</p>
                    </div>
                    {userAnswer !== null
                        ? (
                            <ul>
                                {Question.POSSIBLE_ANSWERS.map(option => (
                                    <li
                                        key={option}
                                        className={userAnswer === option ? 'selected' : ''}
                                    >
                                        <p>{question[option].text}</p>
                                        <p>
                                            {question[option].votes.length}/{totalVotes} votes
                                            ({Math.round(question[option].votes.length * 100 / totalVotes)}%)
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <form onSubmit={this.onSubmit}>
                                {Question.POSSIBLE_ANSWERS.map(option => (
                                    <label key={option}>
                                        <input
                                            type='radio'
                                            name='answer'
                                            value={option}
                                            checked={answer === option}
                                            onChange={this.onAnswerChange}
                                        />
                                        {question[option].text}
                                    </label>
                                ))}
                                <button type='submit'>Submit</button>
                            </form>
                        )
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
    const question = questions[id];
    const authorId = question.author;
    const author = users[authorId];
    const userAnswersSet = new Set(Object.keys(users[authedUser].answers));
    const userAnswer = userAnswersSet.has(id)
        ? users[authedUser].answers[id]
        : null

    return {
        author,
        question,
        authedUser,
        userAnswer,
    }
}

export default connect(mapStateToProps)(Question);
