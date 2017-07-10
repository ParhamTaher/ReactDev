import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import ReduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import QueueIndex from './containers/QueueIndex';
import LoginForm from './containers/Login';
import SignUp from './containers/SignUp';
import Profile from './containers/Profile';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/signup" component={SignUp} />
                <Route path="/profile" component={Profile} />
                <Route path="/" component={QueueIndex} />
            </Switch>
        </div>
    </BrowserRouter>
  </Provider>
, document.querySelector('.container'));
