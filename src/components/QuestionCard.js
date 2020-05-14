import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function QuestionCard(props) {
    const { author, question, id } = props;

    return (
        <Link to={`/questions/${id}`} className='card card--question clickable'>
            <div className='avatar-container'>
                <img
                    src={author.avatarURL}
                    className='avatar'
                    alt={`Avatar of ${author.name}`}
                />
                <p><strong>Author:</strong> {author.name}</p>
            </div>
            <div className='question-container'>
                <h3>Would You Rather...</h3>
                <div>
                    <p>a) {question.optionOne.text}</p>
                    <p>b) {question.optionTwo.text}</p>
                </div>
            </div>
        </Link>
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
