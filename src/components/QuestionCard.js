import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function QuestionCard(props) {
    const { author, question, id } = props;

    // TODO: Come back for styles
    return (
        <div className='user-card'>
            <div className='avatar-container'>
                <img
                    src={author.avatarURL}
                    className='avatar'
                    alt={`Avatar of ${author.name}`}
                />
                <p><strong>Author:</strong> {author.name}</p>
            </div>
            <div>
                <h3>Would You Rather...</h3>
                <div>
                    <p>{question.optionOne.text}</p>
                    <p>{question.optionTwo.text}</p>
                    <Link to={`/questions/${id}`}>
                        View Poll
                        </Link>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps({ users, questions }, { id }) {
    const question = questions[id];
    const authorId = question.author;
    const author = users[authorId];

    return {
        author,
        question,
    }
}

export default connect(mapStateToProps)(QuestionCard);
