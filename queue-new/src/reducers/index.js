import { combineReducers } from 'redux';
import authReducer from './authReducer';
import queueReducer from './queueReducer';
// Keep track of our current location, in the store
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: authReducer,
    form: FormReducer,
    patientList: queueReducer,
    router: routerReducer
});

export default rootReducer;
