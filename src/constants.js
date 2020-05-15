import PropTypes from 'prop-types';

export const OPTION_ONE = 'optionOne';
export const OPTION_TWO = 'optionTwo';

export const POSSIBLE_OPTIONS = [OPTION_ONE, OPTION_TWO];

export const OPTION_LABELS = {
    [OPTION_ONE]: 'Option 1',
    [OPTION_TWO]: 'Option 2',
}

export const PROPTYPE_SHAPE_USER = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired,
    answers: PropTypes.objectOf(PropTypes.oneOf(POSSIBLE_OPTIONS)).isRequired,
    questions: PropTypes.arrayOf(PropTypes.string).isRequired
}

const PROPTYPE_SHAPE_OPTION = {
    text: PropTypes.string.isRequired,
    votes: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export const PROPTYPE_SHAPE_QUESTION = {
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    [OPTION_ONE]: PropTypes.shape(PROPTYPE_SHAPE_OPTION).isRequired,
    [OPTION_TWO]: PropTypes.shape(PROPTYPE_SHAPE_OPTION).isRequired,
}
