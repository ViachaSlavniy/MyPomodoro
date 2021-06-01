import {InferActionsTypes} from "../store";

const initialState = {
    schemes: [
        {
            name: 'classic',
            workTimeMinutes: 25,
            shortBreakMinutes: 5,
            longBreakMinutes: 15,
            longBreakEveryShortBreaks: 4,
            active: true
        },
        {
            name: 'personal',
            workTimeMinutes: 30,
            shortBreakMinutes: 2,
            longBreakMinutes: 25,
            longBreakEveryShortBreaks: 4,
            active: false
        },
        {
            name: 'work',
            workTimeMinutes: 50,
            shortBreakMinutes: 10,
            longBreakMinutes: 25,
            longBreakEveryShortBreaks: 2,
            active: false
        },
    ],
}

export const settingsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'CHANGE_ACTIVE_SCHEME':
            const newSchemes = state.schemes.map(scheme => {
                if (scheme.active) {
                    return {...scheme, active: false}
                }
                if (scheme.name === action.payload.name) {
                    return {...scheme, active: true}
                }
                return scheme;
            })
            return {
                ...state,
                schemes: newSchemes
            }
        case 'ADD_NEW_SCHEME': {
            return {
                ...state,
                schemes: [...state.schemes, action.payload]
            }
        }
        case 'DELETE_SCHEME': {
            const newSchemes = state.schemes.filter(scheme => scheme.name !== action.payload.schemeName)
            return {
                ...state,
                schemes: newSchemes
            }
        }
        default:
            return state;
    }
}

export const actions = {
    changeActiveScheme: (name: string) => ({type: 'CHANGE_ACTIVE_SCHEME', payload: {name}} as const),
    addNewScheme: (objScheme: SchemeType) => ({type: 'ADD_NEW_SCHEME', payload: objScheme} as const),
    deleteScheme: (schemeName: string) => ({type: 'DELETE_SCHEME', payload: {schemeName}} as const),
}


// TYPES
export type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>;
export type SchemeType = typeof initialState.schemes[1];
export type InitialStateType = typeof initialState