import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AvatarCard from './AvatarCard';
import { PROPTYPE_SHAPE_USER } from '../constants';

function LeaderboardPosition(props) {
    const { position, user } = props;
    const questionsAsked = user.questions.length;
    const questionsAnswered = Object.keys(user.answers).length;
    const total = questionsAsked + questionsAnswered;

    return (
        <div className='card'>
            <div className='position'>{position}</div>
            <div className='card-left'>
                <AvatarCard id={user.id}>
                    <p>{user.name}</p>
                </AvatarCard>
            </div>
            <div className='position-middle middle'>
                <p>Questions asked: {questionsAsked}</p>
                <p>Questions answered: {questionsAnswered}</p>
            </div>
            <div className='position-total middle'>
                <p>{total}</p>
                <p>Total</p>
            </div>
        </div>
    );
}

LeaderboardPosition.propTypes = {
    id: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    user: PropTypes.shape(PROPTYPE_SHAPE_USER),
}

function mapStateToProps({ users }, { id }) {
    return {
        user: users[id],
    }
}

export default connect(mapStateToProps)(LeaderboardPosition);
