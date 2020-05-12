import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { handleInitialData } from '../actions/shared';
import Nav from './Nav';

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleInitialData());
    }

    render() {
        return (
            <div>
                <LoadingBar className='loading-bar' />
                <div className='container'>
                    <Nav />
                    <h1 className='center'>Would You Rather...</h1>
                </div>
            </div>
        );
    }
}

export default connect()(App);
