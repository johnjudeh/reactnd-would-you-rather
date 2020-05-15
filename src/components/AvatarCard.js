import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PROPTYPE_SHAPE_USER } from '../constants';

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

AvatarCard.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape(PROPTYPE_SHAPE_USER).isRequired,
    children: PropTypes.element,
}

function mapStateToProps({ users }, { id }) {
    return {
        user: users[id],
    }
}

export default connect(mapStateToProps)(AvatarCard);