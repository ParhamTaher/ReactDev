import { USER_SIGNUP_REQUEST } from '../actions/signUpActions';
import { USER_LOGIN_REQUEST, SIGN_IN_USER, SIGN_OUT_USER } from '../actions/authActions';

export default function (state = {}, action) {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { ...state, ...action.payload };
        case USER_LOGIN_REQUEST:
            return { ...state, ...action.payload };
        case SIGN_IN_USER:
            return {
                ...state, authenticated: true
            };
        case SIGN_OUT_USER:
            return {
                ...state, authenticated: false
            };
        default:
            return state;
    }
}
