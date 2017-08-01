import { REQUEST_LIST } from '../actions';
import _ from 'lodash';

const initialState = {
    data: [],
    upNext: null,
    current: null,
    term: null
};

function refactorList(lst) {
    let new_list = [];
    _.map(lst, (post, key) => {
        return (
            new_list.push({id: key, cName: post.cName, cNumber: post.cNumber, enterTime: post.enterTime})
        );
    });
    return new_list;
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_LIST:
            if (action.payload.term == null || action.payload.term === '') {
                return {
                    data: refactorList(action.payload.data),
                    upNext: action.payload.upNext,
                    current: action.payload.current,
                    term: action.payload.term
                };
            } else {
                return {
                    data: refactorList(state.data).filter(
                                    (person) => {
                                        return person.cName.toLowerCase().indexOf(action.payload.term.toLowerCase()) !== -1;
                                    }),
                    upNext: action.payload.upNext,
                    current: action.payload.current,
                    term: action.payload.term
                };
            }
        default:
            return state;
    }
}
