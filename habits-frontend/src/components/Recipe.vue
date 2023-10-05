<template>
    <section class="container px-3 max-w-xl mx-auto flex flex-col">
        <div class=" p-16 rounded-lg text-center">
            <div class="my-3 font-bold text-4xl md:text-5xl lg:text-6xl">
                {{ getCurrentRecipe?.Name ?? 'Loading...' }}
            </div>
            <!-- <p class="whitespace-pre-line">{{ getCurrentRecipe.Instructions }}</p> -->
            <textarea v-if="edit" class="w-full h-64" v-model="getCurrentRecipe.Instructions"></textarea>
            <div v-else class="markdown" v-html="instruction"></div>

            <button v-if="editable" @click="() => edit = !edit" class="sidebar-icon absolute bottom-4 right-4 shadow-lg">
                <font-awesome-icon :icon="['fas', edit ? 'check' : 'pencil']" />
            </button>
        </div>
    </section>
</template>
<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { marked } from 'marked';
export default {
    name: "Recipe",
    data() {
        return {
            marked,
            edit: false
        };
    },
    computed: {
        ...mapGetters(["getRecipes", "getCurrentRecipe", "getAccount"]),
        instruction: function () {
            return marked(this.getCurrentRecipe?.Instructions ?? '')
        },
        editable: function () {
            return this.getCurrentRecipe?.Owner === this.getAccount?.uid
        }
    },
    methods: {
        ...mapActions(["fetchRecipes", "fetchAccount", "fetchRecipe"]),
    },
    created() {
        if (!this.getRecipes) this.fetchRecipes();
        this.fetchRecipe(this.$route.params.id)
    },
}
</script>