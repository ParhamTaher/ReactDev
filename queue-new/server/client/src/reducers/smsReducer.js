import {
    SET_SMS_SENT_TRUE,
    SET_SMS_SENT_FALSE,
    SET_SMS_SENT_ERROR
} from '../actions';

const initialState = {
    smsSent: true,
    errorStatus: null,
    msg: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_SMS_SENT_TRUE:
            return {
                ...state,
                smsSent: true,
                errorStatus: action.payload.responseMSG,
                msg: action.payload.message
            };
        case SET_SMS_SENT_FALSE:
            return {
                ...state,
                smsSent: false
            };
        case SET_SMS_SENT_ERROR:
            return {
                ...state,
                smsSent: true,
                errorStatus: action.payload.responseMSG,
                msg: action.payload.message
            };
        default:
            return state;
    }
}
