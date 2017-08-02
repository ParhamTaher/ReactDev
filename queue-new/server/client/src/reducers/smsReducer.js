import { SET_SMS_SENT_TRUE, SET_SMS_SENT_FALSE } from '../actions';

const initialState = {
    smsSent: true
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_SMS_SENT_TRUE:
            return {
                ...state,
                smsSent: true
            };
        case SET_SMS_SENT_FALSE:
            return {
                ...state,
                smsSent: false
            };
        default:
            return state;
    }
}
