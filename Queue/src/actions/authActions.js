import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

export const USER_LOGIN_REQUEST = 'userLoginRequest';

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

export function userLoginRequest(userData, callback) {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
            .then(() => callback())
            .catch(function(error) {
                dispatch({
                  type: USER_LOGIN_REQUEST,
                  payload: { msg: error.message }
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
