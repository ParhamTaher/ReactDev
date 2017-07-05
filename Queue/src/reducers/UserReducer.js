import { USER_SIGNUP_REQUEST } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return action.payload;
        default:
            return state;
    }
}
