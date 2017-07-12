import { combineReducers } from 'redux';
import QueueReducer from './QueueReducer';
import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    patientList: QueueReducer,
});

export default rootReducer;
