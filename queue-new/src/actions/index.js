import * as firebase from 'firebase';

export const REQUEST_LIST = 'request_list';
export const SIGN_OUT_USER = 'sign_out_user';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';

// Initialize Firebase
const config = {
    apiKey: 'AIzaSyBUzE7gC50uaSaxUXNjmH3dr04KMjeZALc',
    authDomain: 'queue-c5f89.firebaseapp.com',
    databaseURL: 'https://queue-c5f89.firebaseio.com',
    projectId: 'queue-c5f89',
    storageBucket: 'queue-c5f89.appspot.com',
    messagingSenderId: '633994224151'
};

firebase.initializeApp(config);

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

export function signUpUser(credentials) {
    return function(dispatch) {
        firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
                dispatch(authUser());
            })
            .catch(error => {
                console.log(error);
                dispatch(authError(error));
            });
    }
}

export function signInUser(credentials) {
    return function(dispatch) {
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
                dispatch(authUser());
            })
            .catch(error => {
                dispatch(authError(error));
            });
    }
}

export function signOutUser() {
    return {
        type: SIGN_OUT_USER
    };
}

// Dual-purpose action used for both signin and signup
export function authUser() {
    return {
        type: AUTH_USER
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}
