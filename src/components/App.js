import React, { Component } from 'react';
import { createStore } from 'redux';
import reducer from '../reducers';
import middleware from '../middleware';
import { Provider } from 'react-redux';

const store = createStore(reducer, middleware);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <h1>Would You Rather...</h1>
                </div>
            </Provider>
        );
    }
}

export default App;
