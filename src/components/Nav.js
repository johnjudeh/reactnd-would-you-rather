import React from 'react';

function Nav(props) {
    return (
        <nav className='nav'>
            <ul className='half'>
                <li>Home</li>
                <li>New Poll</li>
                <li>Leaderboard</li>
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
