import {InferActionsTypes} from "../store";


const initialState = {
    tasks: [] as Array<TaskType>,
}

export type InitialStateType = typeof initialState;

export const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'ADD_NEW_TASK':
            return {
                ...state,
                tasks:
                    [...state.tasks,
                    {
                        id: state.tasks.length + 1,
                        name: action.payload.textTask,
                        category: action.payload.category
                    }
                    ]
            }
        case 'DELETE_TASK':
            const newTasks = state.tasks.filter(task => task.id !== action.payload.id)
            return {
                ...state,
                tasks: newTasks
            }

        default: return state;
    }
}


// Action Creators
export const actions = {
    addNewTask: (textTask: string, category: string) => ({type: 'ADD_NEW_TASK', payload: {textTask, category}} as const),
    deleteTask: (id: number) => ({type: 'DELETE_TASK', payload: {id}} as const),
}

// Types
export type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>;
export type TaskType = {
    id: number,
    name: string,
    category: string,
}