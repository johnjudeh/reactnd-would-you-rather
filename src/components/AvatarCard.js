import React from 'react';
import { connect } from 'react-redux';

function AvatarCard(props) {
    const { user, children } = props;

    return (
        <div className='avatar-card'>
            <img
                className='avatar'
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`}
            />
            {children}
        </div>
    );
}

function mapStateToProps({ users }, { id }) {
    return {
        user: users[id],
    }
}

export default connect(mapStateToProps)(AvatarCard);