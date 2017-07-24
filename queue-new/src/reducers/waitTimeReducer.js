import { GET_AVG_WAIT_TIME } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_AVG_WAIT_TIME:
            return action.payload;
        default:
            return state;
    }
}
