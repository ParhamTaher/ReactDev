import * as firebase from 'firebase';

export const REQUEST_LIST = 'REQUEST_LIST';
export const REQUEST_LIST_DATA = 'REQUEST_LIST_DATA';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const REQUEST_BUSINESS_NAME = 'REQUEST_BUSINESS_NAME';
export const REQUEST_CHANGE_PASS = 'REQUEST_CHANGE_PASS';
export const CHANGE_SUCCESS = 'CHANGE_SUCCESS';
export const CHANGE_ERROR = 'CHANGE_ERROR';

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

// Queue Data
export function requestList(term = null) {
    console.log(' Inside Action, Search Term: ', term);
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    const userUid = firebase.auth().currentUser.uid;
    const dbRef = firebase.database().ref(userUid);

    return dispatch => {
        dbRef.on('value', snapshot => {
            let newPayload = { data: null, upNext: null, current: null, term: null}
            newPayload.data = snapshot.child('queue').val();
            newPayload.upNext = snapshot.child('upNext').val();
            newPayload.current = snapshot.child('current').val();
            newPayload.term = term;
            dispatch({
                type: REQUEST_LIST,
                payload: newPayload
            });
        });
    };
}

export function requestListData() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    const userUid = firebase.auth().currentUser.uid;
    const dbRef = firebase.database().ref(userUid);
    return dispatch => {
        dbRef.on('value', snapshot => {
            let newPayload = { data: null, upNext: null, current: null}
            newPayload.data = snapshot.child('queue').val();
            newPayload.upNext = snapshot.child('upNext').val();
            newPayload.current = snapshot.child('current').val();
            console.log('inside action newPayLoadData: ', newPayload);
            dispatch({
                type: REQUEST_LIST_DATA,
                payload: newPayload
            });
        });
    };
}

export function addCustomer(credentials) {
    console.log('Inside action, Adding Customer: ', credentials.name)
    const userUid = firebase.auth().currentUser.uid;

    var d = new Date();
    return dispatch => firebase.database().ref(userUid).child('queue').push({
                            cName: credentials.name,
                            cNumber: credentials.number,
                            enterTime: d.getHours() + ':' + d.getMinutes(),
                            exitTime: null
                        });
}

export function removeCustomer(postID) {
    const userUid = firebase.auth().currentUser.uid;

    return dispatch => firebase.database().ref(userUid).child('queue/' + postID).remove();
}

export function moveQueue(upNext, current, third) {
    const userUid = firebase.auth().currentUser.uid;
    // First
    if (!current) {
        // Move upNext to current
        return dispatch => firebase.database().ref(userUid).child('current').update(upNext).then(() => {
            firebase.database().ref(userUid).child('queue/' + upNext.id).remove()
        });
    // Last
    } else if (!upNext) {
        return dispatch => {
            firebase.database().ref(userUid).child('completedQueue').push(current).then(() => {
                firebase.database().ref(userUid).child('current').remove().then(() => {
                    firebase.database().ref(userUid).child('upNext').remove()
                })
            });
        }
    } else {
        return dispatch => {
            firebase.database().ref(userUid).child('completedQueue').push(current).then(() => {
                firebase.database().ref(userUid).child('current').update(upNext).then(() => {
                    firebase.database().ref(userUid).child('queue/' + upNext.id).remove().then(() => {
                        firebase.database().ref(userUid).child('upNext').update(third)
                    })
                })
            });
        }
        // Remove upNext from top of queue
        /*
        return dispatch => {
            firebase.database().ref(userUid).child('current').update(upNext);
            console.log('id: ', upNext.id);
            firebase.database().ref(userUid).child('queue/' + upNext.id).remove();
        }
        */


        // Add current to completed queue
        // current = upNext
        // upNext = new top of queue

    }
}


// Auth Data
export function signUpUser(credentials) {
    return function(dispatch) {
        firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
                dispatch(authUser());
            })
            .catch(error => {
                console.log('inside action: ', error);
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

export function requestPasswordChange(credentials) {
    return function(dispatch) {
        var user = firebase.auth().currentUser;

        user.updatePassword(credentials.passwordConfirmation).then(response => {
                    dispatch({
                        type: REQUEST_CHANGE_PASS,
                        payload: { message: 'Success!' }
                    });
                    }).catch(error => {
                        dispatch({
                            type: REQUEST_CHANGE_PASS,
                            payload: error
                        });
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

// Profile Data
export function getBusinessName() {

    return function (dispatch) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const userUid = firebase.auth().currentUser.uid;
                const dbRef = firebase.database().ref(userUid).child('profile');
                dbRef.on('value', snapshot => {
                    console.log('Inside action, Business Name: ', snapshot.val());
                    if (snapshot.val() == null) {
                        dispatch({
                            type: REQUEST_BUSINESS_NAME,
                            payload: { businessName: 'Business Name' }
                        });
                    } else {
                        dispatch({
                            type: REQUEST_BUSINESS_NAME,
                            payload: snapshot.val()
                        });
                    }
                });
            } else {
                dispatch({
                    type: REQUEST_BUSINESS_NAME,
                    payload: 'Business Name'
                });
            }
        });
    }

}

export function updateBusinessName(newName) {
    const userUid = firebase.auth().currentUser.uid;
    return dispatch => firebase.database().ref(userUid).child('profile').update({businessName: newName});
}
