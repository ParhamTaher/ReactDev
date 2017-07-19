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
    const userUid = firebase.auth().currentUser.uid;
    const dbRef = firebase.database().ref(userUid).child('queue');
    return dispatch => {
        dbRef.on('value', snapshot => {
            dispatch({
                type: REQUEST_LIST,
                payload: { data: snapshot.val(), term: term}
            });
        });
    };
}

export function addCustomer(credentials) {
    console.log('NAMEEE: ', credentials.name)
    const userUid = firebase.auth().currentUser.uid;
    var newPostKey = firebase.database().ref(userUid).child('queue').push().key;
    // console.log('Key: ', newPostKey);

    var customerData = {
        [newPostKey]: {
                        cName: credentials.name,
                        cNumber: credentials.number
                    }
    };

    return dispatch => firebase.database().ref(userUid).child('queue').update(customerData);
}

export function removeCustomer(postID) {
    const userUid = firebase.auth().currentUser.uid;

    return dispatch => firebase.database().ref(userUid).child('queue/' + postID).remove();
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
    return function (dispatch) {
        firebase.auth().signOut()
            .then(() =>{
                dispatch({
                    type: SIGN_OUT_USER
                })
            });
        }
}

// If user is signed in, Firebase.auth.onAuthStateChanged()
    // will return a valid user object, and dispatch to authUser()
        // action creator to update authenticated to true on state. Returns null otherwise
export function verifyAuth() {
    return function (dispatch) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(authUser());
            } else {
                dispatch(signOutUser());
            }
        });
    }
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
