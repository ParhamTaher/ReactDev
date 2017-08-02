import { REQUEST_LIST_DATA } from '../actions';
import _ from 'lodash';

const initialState = {
    data: [],
    upNext: null,
    current: null
};

function refactorList(lst) {
    let new_list = [];
    _.map(lst, (post, key) => {
        return new_list.push({
            id: key,
            cName: post.cName,
            cNumber: post.cNumber,
            enterTime: post.enterTime,
            smsSent: post.smsSent
        });
    });
    return new_list;
}

export default function(state = initialState, action) {
    switch (action.type) {
        case REQUEST_LIST_DATA:
            const refactorData = refactorList(action.payload.data);
            return {
                data: refactorData,
                upNext: refactorData[0],
                current: action.payload.current
            };
        default:
            return state;
    }
}
