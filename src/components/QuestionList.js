import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <h2>Poll List</h2>
                <div>
                    {QuestionList.VAL_LABELS.map((label, val) => (
                        <label key={label}>
                            {label}
                            <input
                                type='radio'
                                name='filter'
                                value={val}
                                checked={filter === val}
                                onChange={this.onFilterChange}
                            />
                        </label>
                    ))}
                </div>
                <ul>
                    {questionIds.map(qid => (
                        <li key={qid}>
                            {qid}
                        </li>
                    ))}
                </ul>

            </div>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }) {
    const answeredQuestionIds = Object.keys(users[authedUser].answers);
    const answeredQuestionIdsSet = new Set(answeredQuestionIds);
    const questionIds = Object.keys(questions);

    return {
        answeredQuestionIds,
        unansweredQuestionIds: questionIds.filter(qid => {
            return !answeredQuestionIdsSet.has(qid);
        }),
    }
}

export default connect(mapStateToProps)(QuestionList);
