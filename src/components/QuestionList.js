import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';

class QuestionList extends Component {
    static VAL_UNANSWERED = 0;
    static VAL_ANSWERED = 1;
    static VAL_LABELS = ['Unanswered', 'Answered'];

    constructor(props) {
        super(props);
        this.state = {
            filter: QuestionList.VAL_UNANSWERED,
        }
    }

    onFilterChange = (e) => {
        this.setState({
            filter: Number(e.target.value),
        });
    }

    render() {
        const { filter } = this.state;
        const { answeredQuestionIds, unansweredQuestionIds } = this.props;

        const questionIds = filter === QuestionList.VAL_UNANSWERED
            ? unansweredQuestionIds
            : answeredQuestionIds;

        return (
            <div className='center'>
                <h1>Poll List</h1>
                <div className='tabs'>
                    {QuestionList.VAL_LABELS.map((label, val) => (
                        <div key={label} className='tab'>
                            <input
                                type='radio'
                                name='filter'
                                id={val}
                                value={val}
                                checked={filter === val}
                                onChange={this.onFilterChange}
                            />
                            <label htmlFor={val}>
                                {label}
                            </label>
                        </div>
                    ))}
                </div>
                <ul className='inner-container'>
                    {questionIds.map(qid => (
                        <li key={qid}>
                            <QuestionCard id={qid} />
                        </li>
                    ))}
                </ul>

            </div>
        )
    }
}

const sortByTimestampDesc = (a, b) => b.timestamp - a.timestamp;

function mapStateToProps({ users, questions, authedUser }) {
    const sortedQuestions = Object.values(questions).sort(sortByTimestampDesc);

    const answeredQuestionIds = Object.keys(users[authedUser].answers);
    const sortedAnsweredQuestionIds = sortedQuestions.filter(q => {
        return answeredQuestionIds.includes(q.id);
    }).map(q => q.id);

    const sortedUnansweredQuestionIds = sortedQuestions.filter(q => {
        return !answeredQuestionIds.includes(q.id);
    }).map(q => q.id);

    return {
        answeredQuestionIds: sortedAnsweredQuestionIds,
        unansweredQuestionIds: sortedUnansweredQuestionIds,
    }
}

export default connect(mapStateToProps)(QuestionList);
