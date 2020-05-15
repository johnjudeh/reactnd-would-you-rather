import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import AvatarCard from './AvatarCard';

class UserCard extends Component {
    login = () => {
        const { dispatch, id } = this.props;
        dispatch(setAuthedUser(id));
    }

    render() {
        const { user, id } = this.props;

        return (
            <div className='card card--login clickable' onClick={this.login}>
                <div className='login-avatar-container'>
                    <AvatarCard id={id} />
                </div>
                <div className='username-container'>
                    <p className='username-name bold'>{user.name}</p>
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
