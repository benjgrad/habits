<template>
    <div>
        <section class="container p-16 max-w-xl mx-auto flex flex-col">
            <form class="rounded-lg text-center text-md px-4" @submit="createOrUpdateHabit">
                <input class="rounded-lg w-full my-2" type="text" v-model="matchingHabit.title" />
                <div class="flex my-2">
                    <input class="rounded-lg w-full" type="number" v-model="matchingHabit.frequency_interval" />
                    <p class="my-auto mx-2">times</p>
                    <select class="rounded-lg w-full" v-model="matchingHabit.frequency_period">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
                <div class="flex">
                    <button @click="$router.back()" class="mx-2 p-2 bg-gray-900 text-green-600 rounded-lg w-full my-2"
                        type="submit">Cancel</button>
                    <button class="mx-2 p-2 text-gray-900 bg-green-600 rounded-lg w-full my-2" type="submit">Submit</button>
                </div>
            </form>
            <button class="mt-10 rounded-lg max-w-[300px] mx-auto w-full border border-red-500 text-red-600"
                @click="handleDelete">Delete</button>
        </section>
    </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "CreateHabit",
    computed: {
        ...mapGetters(["getHabits", "getAccount"]),
        matchingHabit() {
            console.log(this.id)
            const currentHabit = this.getHabits.find((habit: any) => habit["$id"] === this.id);
            if (!currentHabit) {
                this.isNew = true;
                console.log('new')
                return {
                    title: "",
                    frequency_interval: 1,
                    frequency_period: "daily",
                };
            }
            else {
                console.log('not new')
                this.isNew = false;
                console.log(currentHabit['$id'])
            }
            return currentHabit;
        },
    },
    data() {
        return {
            id: this.$route.params.id,
            isNew: this.$route.params.id === "new",
        };
    },
    methods: {
        ...mapActions(["addHabit", "updateHabit", "fetchHabits", "fetchAccount", "deleteHabit"]),
        handleDelete() {
            this.deleteHabit({ documentId: this.id });
            this.$router.push("/habits");
        },
        createOrUpdateHabit(e: any) {
            e.preventDefault();
            if (this.isNew) {
                const userId = this.getAccount["$id"];
                const payload = {
                    data: {
                        title: this.matchingHabit.title,
                        frequency_interval: this.matchingHabit.frequency_interval,
                        frequency_period: this.matchingHabit.frequency_period,
                    },
                    userId
                }
                this.addHabit(payload);
            } else {
                const payload = {
                    data: {
                        title: this.matchingHabit.title,
                        frequency_interval: this.matchingHabit.frequency_interval,
                        frequency_period: this.matchingHabit.frequency_period,
                    },
                    documentId: this.id
                }
                console.log(e, payload)
                this.updateHabit(payload);
            }
            this.$router.push("/habits");
        },
    },
    async created() {
        console.log('created')
        if (!this.getAccount) this.fetchAccount();
        if (!this.getHabits || this.getHabits.length == 0) await this.fetchHabits();

    },
}
</script>
