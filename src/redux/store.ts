import { configureStore } from '@reduxjs/toolkit'
import {profileReducer} from "./reducers/profile-reducer";
import {settingsReducer} from "./reducers/settings-reducer";

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        settings: settingsReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type InferActionsTypes<T> = T extends { [key: string]: infer U }
    ? U
    : never;