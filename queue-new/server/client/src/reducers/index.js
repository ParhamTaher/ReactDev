import { combineReducers } from 'redux';
import authReducer from './authReducer';
import queueReducer from './queueReducer';
import completedQueueReducer from './completedQueueReducer';
import businessNameReducer from './businessNameReducer';
import changePassReducer from './changePassReducer';
import notificationReducer from './notificationReducer';
import smsReducer from './smsReducer';
// Keep track of our current location, in the store
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: authReducer,
    bName: businessNameReducer,
    changePass: changePassReducer,
    form: FormReducer,
    patientList: queueReducer,
    patientListData: notificationReducer,
    completedList: completedQueueReducer,
    smsSentStatus: smsReducer,
    router: routerReducer
});

export default rootReducer;
