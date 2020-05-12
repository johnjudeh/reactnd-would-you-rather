import React from 'react';
import { connect } from 'react-redux';

function UserCard({ id, user }) {
    return (
        <div className='user-card'>
            <div className='avatar-container'>
                <img
                    className='avatar'
                    src={user.avatarURL}
                    alt={`Avatar of ${user.name}`}
                />
            </div>
            <div className='username-container'>
                <p className='bold'>{user.name}</p>
                <p>@{user.id}</p>
            </div>
        </div>
    );
}

function mapStateToProps({ users }, { id }) {
    return {
        user: users[id],
    }
}

export default connect(mapStateToProps)(UserCard);
