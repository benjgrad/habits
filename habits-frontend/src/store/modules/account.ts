
import { ActionTree, Commit, GetterTree, MutationTree } from "vuex";
import api from "../../api";
import { Models } from "appwrite";
import router from "../../router";

interface AccountState {
    account: Models.User<Models.Preferences> | null;
    session: Models.Session | null;
}

const state: AccountState = {
    account: null,
    session: null,
};

const actions: ActionTree<AccountState, any> = {
    signup: async ({ commit }: { commit: Commit }, { email, password, name }) => {
        try {
            const account = await api.createAccount(email, password, name);
            await api.createSession(email, password);
            commit("setAccount", account);
        } catch (e: any) {
            commit(
                "setError",
                {
                    show: true,
                    message: e.message,
                    color: "red",
                },
                { root: true }
            );
        }
    },
    fetchAccount: async ({ commit }) => {
        try {
            const account = await api.getAccount();
            commit("setAccount", account);
        } catch (e: any) {
            console.log("Error getting Account", e);
            router.push("/login");
        }
    },
    login: async ({ commit }, { email, password }) => {
        try {
            console.log(email, password);
            await api.createSession(email, password);
            const account = await api.getAccount();
            commit("setAccount", account);
            router.replace('/')
        } catch (e: any) {
            console.log("Error creating Session", e);
            commit(
                "setError",
                {
                    show: true,
                    message: e.message,
                    color: "red",
                },
                { root: true }
            );
        }
    },
    logout: async ({ commit }) => {
        try {
            await api.deleteCurrentSession();
            commit("setAccount", null);
        } catch (e) {
            console.log("Error deleting session");
            commit(
                "setError",
                {
                    show: true,
                    message: "Failed to logout",
                    color: "red",
                },
                { root: true }
            );
        }
    },
};

const getters: GetterTree<AccountState, any> = {
    getAccount: (state) => state.account,
    getSession: (state) => state.session,
};


const mutations: MutationTree<AccountState> = {
    setAccount: (state, account) => (state.account = account),
};

export default {
    state,
    actions,
    getters,
    mutations,
};