import { REQUEST_COMPLETED_LIST } from '../actions';
import _ from 'lodash';
import moment from 'moment';

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



                var timeDiffMinutes = 0;
                var listLength = refactorData.length;

                for (var i=0; i < listLength; i++) {
                    var ms = moment(refactorData[i].exitTime,"DD/MM/YYYY HH:mm:ss").diff(moment(refactorData[i].enterTime,"DD/MM/YYYY HH:mm:ss"));
                    var dur = moment.duration(ms);
                    var timeDiff = Math.floor(dur.asHours()) + moment.utc(ms).format(":mm:ss");
                    console.log('TIMEDIFF!: ', timeDiff);
                    var timeDiffSplit = timeDiff.split(':');
                    timeDiffMinutes += ((timeDiffSplit[0] * 60) + timeDiffSplit[1]);
                    console.log('TIMEDIFFMINUTES!: ', timeDiffMinutes);
                }
                var avgTimeDiff = timeDiffMinutes/listLength;
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
