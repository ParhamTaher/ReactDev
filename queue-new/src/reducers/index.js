import { combineReducers } from 'redux';
import QueueReducer from './QueueReducer';
// Keep track of our current location, in the store
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    patientList: QueueReducer,
    router: routerReducer
});

export default rootReducer;
