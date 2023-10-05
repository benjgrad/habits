import { ActionTree, GetterTree, MutationTree } from "vuex";
import api from "../../api";
import { Server } from "../../utils/config";
import { Query } from "appwrite";



interface RecipeState {
    recipes: any[];
    currentRecipe: any;
}

const state = {
    recipes: [],
    currentRecipe: null,
};

const actions: ActionTree<RecipeState, any> = {
    async fetchRecipe({ commit }, documentId) {
        try {
            const data = await api.resolveDocuments(Server.collections.recipes, [Query.equal("$id", [documentId])]);
            commit("setCurrentRecipe", data[0]);
        } catch (e) {
            console.log("Could not fetch document ", e);
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to fetch Recipe",
                    color: "red",
                },
                { root: true }
            );
        }
    },
    async fetchRecipes({ commit }) {
        try {
            const data = await api.resolveDocuments(Server.collections.recipes);
            console.log(data);
            // commit("setError", { show: true, message: "TEST Failed to fetch Recipe", color: "red" }, { root: true });
            commit("setRecipes", data);
        } catch (e) {
            console.log("Could not fetch documents ", e);
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to fetch recipes: " + e,
                    color: "red",
                },
                { root: true }
            );
        }
    },
    async addRecipe({ commit }, { data, userId }) {
        try {
            const response = await api.createDocument(
                Server.collections.recipes,
                data,
                userId,
            );
            commit("addRecipe", response);
        } catch (e) {
            console.log("Could not create document", e);
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to Add Recipe",
                    color: "red",
                },
                { root: true }
            );
        }
    },
    async updateRecipe({ commit }, { documentId, data }) {
        try {
            console.log('updateRecipe1', documentId, data)
            const response = await api.updateDocument(Server.collections.recipes, documentId, data);
            console.log('updateRecipe2', response)
            commit("updateRecipe", { documentId, data });
        } catch (e) {
            console.log("Could not update document", e);
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to Update Recipe",
                    color: "red",
                },
                { root: true }
            );
        }
    },
    async deleteRecipe({ commit }, { documentId }) {
        try {
            await api.deleteDocument(Server.collections.recipes, documentId);
            commit("deleteRecipe", documentId);
        } catch (e) {
            console.log("Could not delete document", e);
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to Delete Recipe",
                    color: "red",
                },
                { root: true }
            );
        }
    },
};

const getters: GetterTree<RecipeState, any> = {
    getRecipes: (state) => {
        console.log('getRecipes')
        return state.recipes;
    },
    getCurrentRecipe: (state) => state.currentRecipe,
};

const mutations: MutationTree<RecipeState> = {
    setCurrentRecipe: (state, recipe) => state.currentRecipe = recipe,
    setRecipes: (state, recipes) => state.recipes = recipes,
    addRecipe: (state, recipe) => state.recipes.unshift(recipe),
    deleteRecipe: (state, documentId) => state.recipes = state.recipes.filter((recipe) => recipe['$id'] !== documentId),
    updateRecipe: (state, updatedRecipe) => {
        const index = state.recipes.findIndex((recipe) => recipe['$id'] === updatedRecipe['$id']);
        if (index !== -1) {
            state.recipes.splice(index, 1, updatedRecipe);
        }
        console.log('mutate updateRecipe', state.recipes, index)
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
}