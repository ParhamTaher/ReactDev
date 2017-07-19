import { combineReducers } from 'redux';
import authReducer from './authReducer';
import queueReducer from './queueReducer';
import businessNameReducer from './businessNameReducer';
import changePassReducer from './changePassReducer';
// Keep track of our current location, in the store
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: authReducer,
    bName: businessNameReducer,
    changePass: changePassReducer,
    form: FormReducer,
    patientList: queueReducer,
    router: routerReducer
});

export default rootReducer;
