import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyBfdvk-0RDbZ4_3Cmn9Nl2hWtIguohuJJU",
    authDomain: "mypomodorodb.firebaseapp.com",
    projectId: "mypomodorodb",
    storageBucket: "mypomodorodb.appspot.com",
    messagingSenderId: "169486799363",
    appId: "1:169486799363:web:48ed9e99b8800091a0f436",
    measurementId: "G-3HSJ8ZNYER"
});

const auth = firebase.auth();
const firestore = firebase.firestore();


const initialState = {

}

type InitialStateType = typeof initialState;

export const authReducer = (state = initialState, action: any): InitialStateType  => {
    switch (action.type) {
        default: return state;
    }
}

// export const authThunk = () => async (dispatch) => {
//
// }