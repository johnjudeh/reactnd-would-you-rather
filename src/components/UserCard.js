import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class UserCard extends Component {
    login = () => {
        const { dispatch, id } = this.props;
        dispatch(setAuthedUser(id));
    }

    render() {
        const { user } = this.props;

        return (
            <div className='user-card' onClick={this.login}>
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
}

function mapStateToProps({ users }, { id }) {
    return {
        user: users[id],
    }
}

export default connect(mapStateToProps)(UserCard);
