import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AvatarCard from './AvatarCard';

function QuestionCard(props) {
    const { author, question, id } = props;

    return (
        <Link to={`/questions/${id}`} className='card card--question clickable'>
            <div className='card-left'>
                <AvatarCard id={author.id}>
                    <p><strong>Author:</strong> {author.name}</p>
                </AvatarCard>
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

    return {
        question,
        author: users[question.author],
    }
}

export default connect(mapStateToProps)(QuestionCard);
