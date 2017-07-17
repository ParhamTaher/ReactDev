import { combineReducers } from 'redux';
import QueueReducer from './QueueReducer';
// Keep track of our current location, in the store
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: FormReducer,
    patientList: QueueReducer,
    router: routerReducer
});

export default rootReducer;
