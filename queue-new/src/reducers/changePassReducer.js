import { REQUEST_CHANGE_PASS } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case REQUEST_CHANGE_PASS:
            return action.payload;
        default:
            return state;
    }
}
