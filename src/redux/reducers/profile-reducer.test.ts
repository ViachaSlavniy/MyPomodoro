import {actions, InitialStateType, profileReducer} from "./profile-reducer";

let state: InitialStateType;

beforeEach(() => {
    state = {
        tasks: [
            {id: 1, name: 'First task', category: 'personal'}
        ],
        categories: [],
    }
})

test('task must be added', () => {
    const action = actions.addNewTask('Create my pomodoro', 'personal');
    const newState = profileReducer(state, action)

    expect(newState.tasks.length).toBe(2);
})
test('task must be deleted', () => {
    const action = actions.deleteTask(1);
    const newState = profileReducer(state, action);

    expect(newState.tasks.length).toBe(0);
})
test('category must be added', () => {

})