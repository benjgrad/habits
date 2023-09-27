import { ActionTree, GetterTree, MutationTree } from "vuex";
import api from "../../api";
import { Server } from "../../utils/config";
import { Query } from "appwrite";

interface Todo {
    $id: string;
    title: string;
    isComplete: boolean;
    date: string;
    habits?: string;
}

interface TodoState {
    todos: Todo[];
}

const state = {
    todos: [],
};

const actions: ActionTree<TodoState, any> = {
    async fetchTodos({ commit }, queries?: string[]) {
        try {
            let data = await api.resolveDocuments(Server.collections.tasks);

            commit("setTodos", data);
        } catch (e) {
            console.log("Could not fetch documents ", e);
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to fetch Todo",
                    color: "red",
                },
                { root: true }
            );
        }
    },
    async addTodo({ commit }, { data, userId }) {
        try {
            const response = await api.createDocument(
                Server.collections.tasks,
                data,
                userId,
            ).catch((e) => {
                console.log("Could not create document", e);
                commit(
                    "setError",
                    {
                        show: true,
                        message: "Failed to Add Todo",
                        color: "red",
                    },
                    { root: true }
                );
            });
            console.log("response", response)
            commit("addTodo", response);
        } catch (e) {
            console.log("Could not create document", e);
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to Add Todo",
                    color: "red",
                },
                { root: true }
            );
        }
    },
    async updateTodo({ commit }, { documentId, data }) {
        try {
            const response = await api.updateDocument(
                Server.collections.tasks,
                documentId,
                data
            );
            commit("updateTodo", response);
        } catch (e) {
            console.log("Could not update document", e);
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to updated Todo",
                    color: "red",
                },
                { root: true }
            );
        }
    },
    async deleteTodo({ commit }, documentId) {
        try {
            await api.deleteDocument(Server.collections.tasks, documentId);
            commit("deleteTodo", documentId);
        } catch (e) {
            console.log("Could not delete document", e);
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to delete Todo",
                    color: "red",
                },
                { root: true }
            );
        }
    },
};

const getters: GetterTree<TodoState, any> = {
    todos: (state) => state.todos,
};

const mutations: MutationTree<TodoState> = {
    setTodos: (state, todos) => (state.todos = todos),
    addTodo: (state, todo) => state.todos.unshift(todo),
    deleteTodo: (state, id) =>
        (state.todos = state.todos.filter((todo) => todo["$id"] !== id)),
    updateTodo: (state, updatedTodo) => {
        const index = state.todos.findIndex(
            (todo) => todo["$id"] === updatedTodo["$id"]
        );
        if (index !== -1) {
            state.todos.splice(index, 1, updatedTodo);
        }
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};