import React from 'react';
import { connect } from 'react-redux';

function LeaderboardPosition(props) {
    const { position, user } = props;
    const questionsAsked = user.questions.length;
    const questionsAnswered = Object.keys(user.answers).length;
    const total = questionsAsked + questionsAnswered;

    return (
        <div className='card'>
            <p className='position'>{position}</p>
            <div className='avatar-container'>
                <img
                    src={user.avatarURL}
                    className='avatar'
                    alt={`Avatar of ${user.name}`}
                />
                <p>{user.name}</p>
            </div>
            <div className='middle position-middle'>
                <p>Questions asked: {questionsAsked}</p>
                <p>Questions answered: {questionsAnswered}</p>
            </div>
            <div className='middle position-total'>
                <p>{total}</p>
                <p>Total</p>
            </div>
        </div>
    );
}

function mapStateToProps({ users }, { id }) {
    return {
        user: users[id],
    }
}

export default connect(mapStateToProps)(LeaderboardPosition);
