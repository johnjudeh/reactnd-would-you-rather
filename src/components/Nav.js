import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { unsetAuthedUser } from '../actions/authedUser';
import AvatarCard from './AvatarCard';
import { PROPTYPE_SHAPE_USER } from '../constants';

class Nav extends Component {
    static propTypes = {
        userLoggedIn: PropTypes.bool.isRequired,
        user: PropTypes.shape(PROPTYPE_SHAPE_USER),
        dispatch: PropTypes.func.isRequired,
    }

    logout = () => {
        const { dispatch } = this.props;
        dispatch(unsetAuthedUser());
    }

    render() {
        const { userLoggedIn, user } = this.props;

        return (
            <nav className='nav'>
                <ul className='half'>
                    <li>
                        <NavLink
                            to='/'
                            exact
                            activeClassName='selected'
                            className='nav-link'
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/add'
                            activeClassName='selected'
                            className='nav-link'
                        >
                            New Poll
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/leaderboard'
                            activeClassName='selected'
                            className='nav-link'
                        >
                            Leaderboard
                        </NavLink>
                    </li>
                </ul>
                {userLoggedIn !== true
                    ? null
                    : <ul className='half right'>
                        <li>
                            {user.name}
                        </li>
                        <li className='nav-item-avatar'>
                            <AvatarCard id={user.id} />
                        </li>
                        <li
                            className='logout'
                            onClick={this.logout}
                        >
                            Logout
                        </li>
                    </ul>
                }
            </nav>
        );
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        userLoggedIn: authedUser !== null ? true : false,
        user: authedUser !== null ? users[authedUser] : null,
    }
}

export default connect(mapStateToProps)(Nav);
