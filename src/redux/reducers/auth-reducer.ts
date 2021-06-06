import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {createContext} from "react";
import {AppDispatch} from "../store";

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

export const fireData = {
    firebase,
    auth,
    firestore
}

export const FireContext = createContext(fireData);

const initialState = {
    isAuth: false,
    user: null as UserType | null,
}

type InitialStateType = typeof initialState;

export const authReducer = (state = initialState, action: any): InitialStateType  => {
    switch (action.type) {
        case 'FIRE_AUTH':
            return {
                ...state,
                isAuth: true,
                user: {
                    ...state.user,
                    userName: action.payload.displayName,
                    email: action.payload.email,
                    photo: action.payload.photo
                }
            }
        case 'FIRE_LOGOUT':
            return {
                ...state,
                isAuth: false,
                user: null
            }
        default: return state;
    }
}


export const actions = {
    fireLogin: (displayName: string | null, email: string | null, photo: string | null) => ({type: 'FIRE_AUTH', payload: {displayName, email, photo}} as const),
    fireLogOut: () => ({type: 'FIRE_LOGOUT'} as const)
}

export const authWithGoogle = () => async (dispatch: AppDispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    const {displayName, email, photoURL} = user as User;
    dispatch(actions.fireLogin(displayName, email, photoURL))
}

export const signOut = () => async (dispatch: AppDispatch) => {
    await auth.signOut();
    dispatch(actions.fireLogOut());
}

//Types
type User = firebase.User;
export type UserType = {
    userName: string | null,
    email: string | null,
    photo: string | null
}