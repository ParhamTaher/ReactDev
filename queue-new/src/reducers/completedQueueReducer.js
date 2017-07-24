import { REQUEST_COMPLETED_LIST } from '../actions';
import _ from 'lodash';

const initialState = {
    data: [],
    avgWaitTime: 0,
    numCustSeen: 0
};


function refactorList(lst) {
    let new_list = [];
    _.map(lst, (post, key) => {
        return (
            new_list.push({id: key, cName: post.cName, cNumber: post.cNumber, enterTime: post.enterTime, exitTime: post.exitTime})
        );
    });
    return new_list;
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_COMPLETED_LIST:
            if(action.payload != null) {
                var refactorData = refactorList(action.payload);
                console.log('refacotred data in completed queue: ', refactorData);
                var timeDiff = 0;
                var listLength = refactorData.length;

                for (var i=0; i < listLength; i++) {
                    var enterTimeSplit = refactorData[i].enterTime.split(':');
                    var exitTimeSplit = refactorData[i].exitTime.split(':');
                    timeDiff += (((exitTimeSplit[0] - enterTimeSplit[0]) * 60) + exitTimeSplit[1] - enterTimeSplit[1]);
                }
                var avgTimeDiff = timeDiff/listLength;
                var hours = Math.floor(avgTimeDiff / 60);
                var minutes = avgTimeDiff % 60;

                return {
                    data: refactorData,
                    avgWaitTime: hours + ' hours and ' + minutes + ' minute(s)',
                    numCustSeen: refactorData.length
                };
            } else {
                return state
            }
        default:
            return state;
    }
}
