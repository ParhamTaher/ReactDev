import { REQUEST_LIST } from '../actions';
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
        case REQUEST_LIST:
            if (action.payload.term == null || action.payload.term === '') {
                return refactorList(action.payload.data);
            } else {
                return refactorList(state).filter(
                    (person) => {
                        return person.cName.toLowerCase().indexOf(action.payload.term.toLowerCase()) !== -1;
                    });
            }
        default:
            return state;
    }
}
