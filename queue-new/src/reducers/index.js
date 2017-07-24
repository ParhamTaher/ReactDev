import { combineReducers } from 'redux';
import authReducer from './authReducer';
import queueReducer from './queueReducer';
import completedQueueReducer from './completedQueueReducer';
import waitTimeReducer from './waitTimeReducer';
import businessNameReducer from './businessNameReducer';
import changePassReducer from './changePassReducer';
import notificationReducer from './notificationReducer';
// Keep track of our current location, in the store
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: authReducer,
    bName: businessNameReducer,
    avgWaitTime: waitTimeReducer,
    changePass: changePassReducer,
    form: FormReducer,
    patientList: queueReducer,
    patientListData: notificationReducer,
    completedList: completedQueueReducer,
    router: routerReducer
});

export default rootReducer;
