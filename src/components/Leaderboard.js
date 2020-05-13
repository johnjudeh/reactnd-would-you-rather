import React from 'react';
import { connect } from 'react-redux';
import LeaderboardPosition from './LeaderboardPosition';

function Leaderboard(props) {
    const { userIds } = props;

    return (
        <div className='center'>
            <h1>Leaderboard</h1>
            <ul>
                {userIds.map((uid, pos) => (
                    <li key={uid}>
                        <LeaderboardPosition position={pos + 1} id={uid} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function mapStateToProps({ users }) {
    const sortedUsers = Object.values(users).sort((a, b) => {
        const aTotalQuestions = a.questions.length + Object.keys(a.answers).length;
        const bTotalQuestions = b.questions.length + Object.keys(b.answers).length;
        return bTotalQuestions - aTotalQuestions;
    });

    return {
        userIds: sortedUsers.map(user => user.id),
    }
}

export default connect(mapStateToProps)(Leaderboard);
