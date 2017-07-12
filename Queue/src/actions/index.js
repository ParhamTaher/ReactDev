import * as firebase from 'firebase';

export const USER_LOGIN_REQUEST = 'userLoginRequest';
export const USER_SIGNUP_REQUEST = 'userSignupRequest';
export const FETCH_LIST = 'fetch_list';

export const SIGN_OUT_USER = 'SIGN_OUT_USER';
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

export function userLoginRequest(userData) {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
            .then(response => {
                dispatch(authUser());
            })
            .catch(error => {
                dispatch(authError(error));
            });
    };
}

export function userSignupRequest(userData, callback) {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    return dispatch => {
        console.log('action working!');
        console.log(userData);

        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
            .then(() => callback())
            .catch(function(error) {
                dispatch({
                  type: USER_SIGNUP_REQUEST,
                  payload: { msg: error.message }
                });
            });
    };
}

export function fetchList() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    const dbRef = firebase.database().ref('/');

    return dispatch => {
    dbRef.on('value', snapshot => {
      dispatch({
        type: FETCH_LIST,
        payload: snapshot.val()
      });
    });
};
}


export function signOutUser() {
    return {
        type: SIGN_OUT_USER
    };
}

export function authUser() {
    return {
        type: AUTH_USER
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}
