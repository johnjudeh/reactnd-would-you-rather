import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserCard from './UserCard';

function Login(props) {
    const { userIds } = props;

    return (
        <div className='login-card'>
            <header className='login-card-header center'>
                <h2>Login as...</h2>
            </header>
            <ul className='user-card-list'>
                {userIds.map(uid => (
                    <li key={uid}>
                        <UserCard id={uid} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function mapStateToProps({users}) {
    return {
        userIds: Object.keys(users),
    }
}

export default connect(mapStateToProps)(Login);
