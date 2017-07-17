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
    console.log('Search Term: ', term);
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
