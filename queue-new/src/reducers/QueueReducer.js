import { FETCH_LIST } from '../actions';
import _ from 'lodash';

function refactorList(lst) {
    let new_list = [];
    _.map(lst, (post, key) => {
        return (
            new_list.push({id: key, cName: post.cName, cNumber: post.cNumber})
        );
    });
    return new_list;
}

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_LIST:
            return action.payload;
        default:
            return state;
    }
}
