import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Nav from './Nav';
import Login from './Login';
import QuestionList from './QuestionList';
import Question from './Question';
import NewQuestion from './NewQuestion';

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleInitialData());
    }

    render() {
        const { userLoggedIn } = this.props;

        return (
            <div>
                <LoadingBar className='loading-bar' />
                <div className='container'>
                    <Nav />
                    {userLoggedIn !== true
                        ? <Login />
                        : <div>
                            <Route path='/' exact component={QuestionList} />
                            <Route path='/new' component={NewQuestion} />
                            <Route path='/questions/:qid' render={({ match }) => (
                                <Question id={match.params.qid} />
                            )} />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        userLoggedIn: authedUser !== null ? true : false,
    }
}

export default connect(mapStateToProps)(App);
