import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { handleInitialData } from '../actions/shared';

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleInitialData());
    }

    render() {
        return (
            <div>
                <LoadingBar className='loading-bar' />
                <h1>Would You Rather...</h1>
            </div>
        );
    }
}

export default connect()(App);
