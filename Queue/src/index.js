import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import ReduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import reducers from './reducers';
import QueueIndex from './containers/QueueIndex';
import LoginForm from './containers/Login';
import SignUp from './containers/SignUp';
import Profile from './containers/Profile';

import App from './containers/App';

const history = createHistory();
const createStoreWithMiddleware = applyMiddleware(reduxThunk, routerMiddleware(history))(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
, document.querySelector('.container'));


const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(App);
