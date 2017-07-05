import { combineReducers } from 'redux';
import QueueReducer from './QueueReducer';

const rootReducer = combineReducers({
    patientList: QueueReducer
});

export default rootReducer;
