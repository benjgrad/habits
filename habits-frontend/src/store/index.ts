import { createStore } from 'vuex';
import account from './modules/account';
import todos from './modules/todos';
import habits from './modules/habits';
import recipes from './modules/recipes';

type StateType = {
    error: ErrorType,
}

type ErrorType = {
    message?: string,
    show?: boolean,
    color?: 'red' | 'green' | 'yellow',
}

const state: StateType = {
    error: {},
}

const getters = {
    getError: (state: StateType) => {
        return state.error
    },
}

const actions = {

}

const mutations = {
    setError: (state: StateType, error: ErrorType) => state.error = error
}

const store = createStore({
    state, getters, actions, mutations,
    modules: {
        account,
        todos,
        habits,
        recipes,
    }
});

export default store;