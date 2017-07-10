import { FETCH_LIST } from '../actions/eventActions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_LIST:
            return action.payload;
        default:
            return state;
    }
}
