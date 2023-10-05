import { ActionTree, GetterTree, MutationTree } from "vuex";
import api from "../../api";
import { Server } from "../../utils/config";

export type Habit = {
    $id: string;
    title: string;
    frequency_period: 'daily' | 'weekly' | 'monthly' | 'yearly';
    frequency_interval: number;
}


interface HabitState {
    habits: any[];
}

const state = {
    habits: [],
};

const actions: ActionTree<HabitState, any> = {
    async fetchHabits({ commit }) {
        try {
            const data = await api.resolveDocuments(Server.collections.habits);
            // commit("setError", { show: true, message: "TEST Failed to fetch Habit", color: "red" }, { root: true });
            commit("setHabits", data);
        } catch (e) {
            console.log("Could not fetch documents ", e);
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to fetch Habit",
                    color: "red",
                },
                { root: true }
            );
        }
    },
    async addHabit({ commit }, { data, userId }) {
        try {
            const response = await api.createDocument(
                Server.collections.habits,
                data,
                userId,
            );
            commit("addHabit", response);
        } catch (e) {
            console.log("Could not create document", e);
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to Add Habit",
                    color: "red",
                },
                { root: true }
            );
        }
    },
    async updateHabit({ commit }, { documentId, data }) {
        try {
            console.log('updateHabit1', documentId, data)
            const response = await api.updateDocument(Server.collections.habits, documentId, data);
            console.log('updateHabit2', response)
            commit("updateHabit", { documentId, data });
        } catch (e) {
            console.log("Could not update document", e);
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to Update Habit",
                    color: "red",
                },
                { root: true }
            );
        }
    },
    async deleteHabit({ commit }, { documentId }) {
        try {
            await api.deleteDocument(Server.collections.habits, documentId);
            commit("deleteHabit", documentId);
        } catch (e) {
            console.log("Could not delete document", e);
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to Delete Habit",
                    color: "red",
                },
                { root: true }
            );
        }
    },
};

const getters: GetterTree<HabitState, any> = {
    getHabits: (state) => {
        console.log('getHabits')
        return state.habits;
    },
};

const mutations: MutationTree<HabitState> = {
    setHabits: (state, habits) => state.habits = habits,
    addHabit: (state, habit) => state.habits.unshift(habit),
    deleteHabit: (state, documentId) => state.habits = state.habits.filter((habit) => habit['$id'] !== documentId),
    updateHabit: (state, updateHabit) => {
        const index = state.habits.findIndex((habit) => habit['$id'] === updateHabit['$id']);
        if (index !== -1) {
            state.habits.splice(index, 1, updateHabit);
        }
        console.log('mutate updateHabit', state.habits, index)
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
}