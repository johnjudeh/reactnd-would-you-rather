import React from 'react';
import { connect } from 'react-redux';

function LeaderboardPosition(props) {
    const { position, user } = props;
    const questionsAsked = user.questions.length;
    const questionsAnswered = Object.keys(user.answers).length;
    const total = questionsAsked + questionsAnswered;

    return (
        <div>
            <div className='avatar-container'>
                <p>#{position}</p>
                <img
                    src={user.avatarURL}
                    className='avatar'
                    alt={`Avatar of ${user.name}`}
                />
                <p>{user.name}</p>
            </div>
            <p>Questions asked: {questionsAsked}</p>
            <p>Questions answers: {questionsAnswered}</p>
            <p>Total: {total}</p>
        </div>
    );
}

function mapStateToProps({ users }, { id }) {
    return {
        user: users[id],
    }
}

export default connect(mapStateToProps)(LeaderboardPosition);
