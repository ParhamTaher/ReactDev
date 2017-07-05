import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
//import ReduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import QueueIndex from './components/QueueIndex';
import LoginForm from './components/Login';
import SignUp from './components/SignUp';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <div>
            <Route path="/" component={SignUp} />
            <Route path="login" component={LoginForm} />
            <Route path="signup" component={SignUp} />
        </div>
    </BrowserRouter>
  </Provider>
, document.querySelector('.container'));
