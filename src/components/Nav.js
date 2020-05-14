import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { unsetAuthedUser } from '../actions/authedUser';

class Nav extends Component {
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
                        <li>
                            <img
                                src={user.avatarURL}
                                className='avatar--small'
                                alt={`Avatar of ${user.name}`}
                            />
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
