<template>
    <section class="container px-3 max-w-xl mx-auto flex flex-col">
        <div class=" p-16 rounded-lg text-center">
            <div class="my-3 font-bold text-4xl md:text-5xl lg:text-6xl">
                Habits
            </div>
            <ul>
                <div class="flex justify-between items-center mt-4 px-4" v-for="item in  getHabits " :key="item['$id']">
                    <div class="capitalize ml-3 text-md font-medium">
                        {{ item.title }}
                    </div>
                    <a :href="`/habits/${item['$id']}`"
                        class="focus:outline-none transition duration-75 ease-in-out transform hover:scale-125">
                        <font-awesome-icon :icon="['fas', 'pencil']" />
                    </a>
                </div>
            </ul>
        </div>
    </section>
    <router-link to="/habits/new" class=" sidebar-icon absolute bottom-4 right-4 shadow-lg">
        <font-awesome-icon :icon="['fas', 'plus']" />
    </router-link>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "Habits",
    computed: mapGetters(["getHabits", "getAccount"]),
    data() {
        return {
        };
    },
    methods: {
        ...mapActions(["fetchHabits", "addHabit", "fetchAccount"]),
    },
    created() {
        if (!this.getAccount) this.fetchAccount();
        this.fetchHabits();
    },
}
</script>