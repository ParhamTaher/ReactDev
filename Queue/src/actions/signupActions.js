import * as firebase from 'firebase';

export const USER_SIGNUP_REQUEST = 'userSignupRequest';

// Initialize Firebase
const config = {
    apiKey: 'AIzaSyBUzE7gC50uaSaxUXNjmH3dr04KMjeZALc',
    authDomain: 'queue-c5f89.firebaseapp.com',
    databaseURL: 'https://queue-c5f89.firebaseio.com',
    projectId: 'queue-c5f89',
    storageBucket: 'queue-c5f89.appspot.com',
    messagingSenderId: '633994224151'
};

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
