<template>
    <section class="container px-3 max-w-xl mx-auto flex flex-col">
        <div class="p-16 text-center ">
            <div>

                <div class="flex content-between items-center w-full text-center text-4xl md:text-5xl lg:text-6xl">
                    <input v-on:keyup.enter="handleSearchRecipes" type="text" v-model="searchBarValue"
                        class="relative flex flex-grow px-6  py-4 text-xl rounded-lg border-0 focus:ring-2 focus:ring-gray-800 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl shadow-md"
                        placeholder="Search for recipe..." />

                    <font-awesome-icon @click="handleSearchRecipes"
                        class="h-8 my-auto mx-1 transition-all p-2 rounded-full duration-200 hover:text-green-500 hover:bg-gray-100"
                        :icon="['fas', 'search']" />


                </div>
            </div>
            <div class="w-full text-gray-500" v-for="recipe in getRecipes" :key="recipe.$id">
                <router-link :to="`/recipes/${recipe.$id}`">
                    {{ recipe.Name }}
                </router-link>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
export default {
    name: "Recipes",
    data() {
        return {
            searchBarValue: "",
        };
    },
    computed: {
        ...mapGetters(["getRecipes"]),
    },
    methods: {
        ...mapActions(["fetchRecipes", "fetchAccount"]),
        handleSearchRecipes: (e: Event) => {
            e.preventDefault();

        }
    },
    created() {
        this.fetchRecipes();
    },
}
</script>
