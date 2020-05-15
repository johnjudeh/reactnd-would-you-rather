import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { POSSIBLE_OPTIONS, OPTION_LABELS } from '../constants';
import { handleCreateQuestion } from '../actions/questions';
import { connect } from 'react-redux';

class NewQuestion extends Component {
    static propTypes = {
        authedUser: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        // Dynamically builds the state based on possible options.
        // This makes it easy to add another option or change the
        // values of the options later
        let initialState = {};
        POSSIBLE_OPTIONS.forEach(option => initialState[option] = '');
        this.state = initialState;
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { dispatch, authedUser, history } = this.props;
        const formValues = Object.values(this.state);

        // Redirect to home page on success
        dispatch(handleCreateQuestion(...formValues, authedUser))
            .then(() => history.push('/'));
    }

    render() {
        return (
            <div className='center'>
                <h1>Would You Rather...</h1>
                <form
                    onSubmit={this.onSubmit}
                    className='inner-container middle'
                >
                    {POSSIBLE_OPTIONS.map(option => (
                        <div key={option} className='option-input'>
                            <label htmlFor={option}>
                                {OPTION_LABELS[option]}
                            </label>
                            <input
                                type='text'
                                name={option}
                                id={option}
                                value={this.state[option]}
                                onChange={this.onInputChange}
                            />
                        </div>
                    ))}
                    <button
                        type='submit'
                        className='btn center'
                        disabled={POSSIBLE_OPTIONS.some(option => {
                            return this.state[option] === '';
                        })}
                    >
                        Create Poll
                    </button>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(NewQuestion);
