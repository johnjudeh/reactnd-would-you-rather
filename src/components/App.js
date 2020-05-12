import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Nav from './Nav';
import Login from './Login';

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
                    <Login />
                    <Route path='/' exact>
                        {/* <h1 className='center'>Would You Rather...</h1> */}
                    </Route>
                </div>
            </div>
        );
    }
}

export default connect()(App);
