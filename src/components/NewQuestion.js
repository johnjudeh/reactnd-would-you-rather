import React, { Component } from 'react';
import { POSSIBLE_OPTIONS, OPTION_LABELS } from '../constants';
import { handleCreateQuestion } from '../actions/questions';
import { connect } from 'react-redux';

class NewQuestion extends Component {
    constructor(props) {
        super(props);
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
                <form onSubmit={this.onSubmit}>
                    {POSSIBLE_OPTIONS.map(option => (
                        <label key={option}>
                            {OPTION_LABELS[option]}
                            <input
                                type='text'
                                name={option}
                                value={this.state[option]}
                                onChange={this.onInputChange}
                            />
                        </label>
                    ))}
                    <button type='submit'>Create Poll</button>
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
