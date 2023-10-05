import { createWebHistory, createRouter } from "vue-router";

import Login from "../components/Login.vue";
import SignUp from "../components/SignUp.vue";
import Dashboard from "../components/Dashboard.vue";
import Todo from "../components/Todo.vue";
import Habits from "../components/Habits.vue";
import Recipes from "../components/Recipes.vue";
import Recipe from "../components/Recipe.vue";
import CreateHabit from "../components/CreateHabit.vue";
import store from "../store";

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "/",
                name: "Todo",
                component: Todo,
            },
            {
                path: "/todo/:date",
                name: "DayTodo",
                component: Todo,
            },
            {
                path: "/habits",
                name: "Habits",
                component: Habits,
            },
            {
                path: "/habits/:id",
                name: "CreateHabit",
                component: CreateHabit,
            },
            {
                path: "/recipes",
                name: "Recipes",
                component: Recipes
            },
            {
                path: "/recipes/:id",
                name: "Recipe",
                component: Recipe
            },
            // {
            //     path: "/goals",
            //     name: "Goals",
            //     component: () => import("../components/Goals.vue"),
            // },
            // {
            //     path: "/notes",
            //     name: "Notes",
            //     component: () => import("../components/Notes.vue"),
            // },
            // {
            //     path: "/calendar",
            //     name: "Calendar",
            //     component: () => import("../components/Calendar.vue"),
            // },
            // {
            //     path: "/settings",
            //     name: "Settings",
            //     component: () => import("../components/Settings.vue"),
            // }
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/",
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.getAccount) {
            console.log("User is not logged in", store.getters.getAccount)
            next();
            return
        }
    }
    next();
});

export default router;