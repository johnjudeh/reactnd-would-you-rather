import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAuthedUser } from '../actions/authedUser';
import AvatarCard from './AvatarCard';
import { PROPTYPE_SHAPE_USER } from '../constants';

class UserCard extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        user: PropTypes.shape(PROPTYPE_SHAPE_USER).isRequired,
    }

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
