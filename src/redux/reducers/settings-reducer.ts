import {InferActionsTypes} from "../store";

const initialState = {
    schemes: [
        {name: 'classic', workTimeMinutes: 25, shortBreakMinutes: 5, longBreakMinutes: 15, pomodoroCount: 4},
        {name: 'personal', workTimeMinutes: 30, shortBreakMinutes: 2, longBreakMinutes: 25, pomodoroCount: 4},
        {name: 'work', workTimeMinutes: 50, shortBreakMinutes: 10, longBreakMinutes: 25, pomodoroCount: 2},
    ],
    activeScheme: {name: 'classic', workTimeMinutes: 25, shortBreakMinutes: 5, longBreakMinutes: 15, pomodoroCount: 4}
}

export const settingsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'CHANGE_ACTIVE_SCHEME':
            return {
                ...state,
                activeScheme: action.payload
            }
        case 'ADD_NEW_SCHEME': {
            return {
                ...state,
                schemes: [...state.schemes, action.payload]
            }
        }
        case 'DELETE_SCHEME': {
            const newShemes = state.schemes.filter(scheme => scheme.name !== action.payload.schemeName)
            return {
                ...state,
                schemes: newShemes
            }
        }
        default: return state;
    }
}

export const actions = {
    changeActiveScheme: (objScheme: SchemeTypes) => ({type: 'CHANGE_ACTIVE_SCHEME', payload: objScheme} as const),
    addNewScheme: (objScheme: SchemeTypes) => ({type: 'ADD_NEW_SCHEME', payload: objScheme} as const),
    deleteScheme: (schemeName: string) => ({type: 'DELETE_SCHEME', payload: {schemeName}} as const),
}


// TYPES
export type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>;
export type SchemeTypes = typeof initialState.schemes[1];
export type InitialStateType = typeof initialState