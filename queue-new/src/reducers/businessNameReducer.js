import { REQUEST_BUSINESS_NAME } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case REQUEST_BUSINESS_NAME:
            return action.payload;
        default:
            return state;
    }
}
