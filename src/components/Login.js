import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserCard from './UserCard';

function Login({ userIds }) {
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

Login.propTypes = {
    userIds: PropTypes.arrayOf(PropTypes.string).isRequired,
}

function mapStateToProps({users}) {
    return {
        userIds: Object.keys(users),
    }
}

export default connect(mapStateToProps)(Login);
