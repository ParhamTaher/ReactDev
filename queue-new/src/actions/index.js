import * as firebase from 'firebase';

export const REQUEST_LIST = 'request_list';

// Initialize Firebase
const config = {
    apiKey: 'AIzaSyBUzE7gC50uaSaxUXNjmH3dr04KMjeZALc',
    authDomain: 'queue-c5f89.firebaseapp.com',
    databaseURL: 'https://queue-c5f89.firebaseio.com',
    projectId: 'queue-c5f89',
    storageBucket: 'queue-c5f89.appspot.com',
    messagingSenderId: '633994224151'
};

export function requestList(term = null) {
    console.log('hello', term);
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    const dbRef = firebase.database().ref('/queue');
    return dispatch => {
        dbRef.on('value', snapshot => {
            dispatch({
                type: REQUEST_LIST,
                payload: { data: snapshot.val(), term: term}
            });
        });
    };


}


const queue =  {
    cid1: {
        cName: "Zosya",
        cNumber: "647-123-1234"
    },
    cid2: {
        cName: "Bob",
        cNumber: "905-111-2222"
    }
}

export function showListResult(data) {
    return {
        type: 'SHOW_LIST',
        payload: data
    };
}

export function loadList() {

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    const dbRef = firebase.database().ref('/queue');


    return dispatch => {
        dbRef.on('value', snapshot => {
            dispatch(showListResult(snapshot.val()));
        });
    };

    /*
    return {
        type: FETCH_LIST,
        payload: queue
    };
    */
}
