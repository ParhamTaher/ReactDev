import { combineReducers } from 'redux';
import QueueReducer from './QueueReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
    patientList: QueueReducer,
    errorsSignUp: UserReducer,
    errorsLogin: UserReducer
});

export default rootReducer;
