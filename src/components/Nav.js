import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav(props) {
    return (
        <nav className='nav'>
            <ul className='half'>
                <li>
                    <NavLink to='/' exact activeClassName='selected'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/new' activeClassName='selected'>
                        New Poll
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' activeClassName='selected'>
                        Leaderboard
                    </NavLink>
                </li>
            </ul>
            <ul className='half right'>
                <li>John Judeh</li>
                <li>Avatar</li>
                <li>Logout</li>
            </ul>
        </nav>
    );
}

export default Nav;
