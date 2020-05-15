import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleInitialData } from '../actions/shared';
import Nav from './Nav';
import Login from './Login';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';

class App extends Component {
    static propTypes = {
        userLoggedIn: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
    }

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
                            <Route path='/add' component={NewQuestion} />
                            <Route path='/leaderboard' component={Leaderboard} />
                            <Route path='/questions/:qid' render={({ match }) => (
                                <QuestionDetail id={match.params.qid} />
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
