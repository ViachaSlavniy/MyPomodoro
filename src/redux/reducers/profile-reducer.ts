import {InferActionsTypes} from "../store";
import { uniqueId } from 'lodash';

const initialState = {
    taskInProcess: {
        items: [] as Array<TaskType>,
        categories: [] as Array<CategoryType>,
    },
    taskDone: {
        items: [] as Array<TaskType>,
        categories: [] as Array<CategoryType>,
    },
}

const mapOrFilterCategories = (tasksArr: Array<TaskType>, catId: number, categoriesArr: Array<CategoryType>) => {
    return tasksArr.every(task => task.catId !== catId)
        ? categoriesArr.filter(cat => cat.id !== catId)
        : categoriesArr.map(cat => {
            if (cat.id === catId) {
                return {
                    ...cat,
                    count: cat.count - 1
                }
            }
            return cat;
        })
}

export type InitialStateType = typeof initialState;
export const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'ADD_NEW_TASK':
            let newCategory: Array<CategoryType> = [...state.taskInProcess.categories];
            const isNewCategory = state.taskInProcess.categories.every(cat => cat.name !== action.payload.category);
            const catId = +uniqueId();
            const currentCat = state.taskInProcess.categories.find(cat => cat.name === action.payload.category) as CategoryType;
            if (state.taskInProcess.categories.length === 0 || isNewCategory) {
                newCategory.push({
                    id: catId,
                    name: action.payload.category,
                    count: 1,
                })
            } else {
                newCategory = state.taskInProcess.categories.map(cat => {
                    if (cat.name === action.payload.category) {
                        return {
                            ...cat,
                            count: cat.count + 1,
                        }
                    }
                    return cat;
                })
            }

            return {
                ...state,
                taskInProcess: {
                    ...state.taskInProcess,
                    items: [
                        {
                            id: +uniqueId(),
                            catId: currentCat ? currentCat.id : catId,
                            text: action.payload.textTask,
                            category: action.payload.category,
                            done: false,
                            count: 1
                        },
                        ...state.taskInProcess.items
                    ],
                    categories: newCategory,
                },

            }
        case 'DELETE_TASK': {
            const catId = action.payload.catId;
            const categoriesInProgress = state.taskInProcess.categories;
            const doneCategories = state.taskDone.categories;
            const newTasksInProcess = state.taskInProcess.items.filter(task => task.id !== action.payload.id)
            const newTaskDone = state.taskDone.items.filter(task => task.id !== action.payload.id)
            let newCategoryInProgress: Array<CategoryType> = [...state.taskInProcess.categories]
            let newCategoryDone: Array<CategoryType> = [...state.taskDone.categories]
            if (action.payload.done) {
                newCategoryDone = mapOrFilterCategories(newTaskDone, catId, doneCategories);
            } else {
                newCategoryInProgress = mapOrFilterCategories(newTasksInProcess, catId, categoriesInProgress);
            }

            return {
                ...state,
                taskInProcess: {
                    items: newTasksInProcess,
                    categories: newCategoryInProgress,
                },
                taskDone: {
                    items: newTaskDone,
                    categories: newCategoryDone,
                }
            }
        }
        case 'TASK_DONE': {
            let newDoneCategories: Array<CategoryType> = [...state.taskDone.categories];
            const categoriesInProgress = state.taskInProcess.categories;
            const doneTask = state.taskInProcess.items.find(task => task.id === action.payload.id) as TaskType;
            const isNewCategory = state.taskDone.categories.every(cat => cat.name !== action.payload.category);
            const newTasksInProcess = state.taskInProcess.items.filter(task => task.id !== action.payload.id);
            const newCategoriesInProcess = mapOrFilterCategories(newTasksInProcess, doneTask.catId, categoriesInProgress);

            if (state.taskDone.categories.length === 0 || isNewCategory) {
                newDoneCategories.push({
                    id: doneTask.catId,
                    name: doneTask.category,
                    count: 1
                })
            } else {
                newDoneCategories = state.taskDone.categories.map(cat => {
                    if (cat.name === doneTask.category) {
                        return {
                            ...cat,
                            count: cat.count + 1
                        }
                    }
                    return cat
                })
            }


            return {
                ...state,
                taskInProcess: {
                    items: newTasksInProcess,
                    categories: newCategoriesInProcess
                },
                taskDone: {
                    items: [{...doneTask, done: true}, ...state.taskDone.items],
                    categories: newDoneCategories
                }
            }
        }
        // case 'TASK_REPEAT':
        //     const repeatTask = state.tasks.find(task => {
        //         if (task.id === action.payload.id) {
        //             return {
        //                 ...task,
        //                 done: false
        //             }
        //         }
        //     });
        //     return {
        //         ...state,
        //         tasks: [...state.tasks]
        //     }

        default:
            return state;
    }
}


// Action Creators
export const actions = {
    addNewTask: (textTask: string, category: string) => ({type: 'ADD_NEW_TASK', payload: {textTask, category}} as const),
    deleteTask: (id: number, category: string, done: boolean, catId: number) => ({type: 'DELETE_TASK', payload: {id, category, done, catId}} as const),
    taskDone: (id: number, catId: number, category: string) => ({type: 'TASK_DONE', payload: {id, catId, category}} as const),
    repeatTask: (id: number) => ({type: 'TASK_REPEAT', payload: {id}} as const),
}

// Types
export type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>;
export type TaskType = {
    id: number
    catId: number
    text: string
    category: string
    done: boolean
    count: number
}
export type CategoryType = {
    id: number
    name: string
    count: number
}