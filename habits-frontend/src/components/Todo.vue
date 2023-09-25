<template>
    <section class="container px-3 max-w-xl mx-auto flex flex-col">
        <div class=" p-16 rounded-lg text-center">
            <div class="my-3 font-bold text-3xl md:text-5xl lg:text-6xl">
                {{ date.format("dddd MMMM DD") }}
            </div>
            <AutoComplete :options="getHabits" :onSubmit="handleAddTodo" />

            <ul>
                <todo-item v-for=" item  in  todos.filter((o: any) => {
                    return moment(o.date).isSame(date, 'day')
                })" :key="item['$id']" :todo="item" />
            </ul>
        </div>
    </section>
</template>
<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import TodoItem from "./TodoItem.vue";
import AutoComplete from "./AutoComplete.vue";
import moment from "moment";

export default {
    components: { TodoItem, AutoComplete },
    name: "Todo",
    data() {
        return {
            moment,
            date: moment(),
        };
    },
    computed: mapGetters(["todos", "getAccount", "getHabits"]),
    methods: {
        ...mapActions(["fetchTodos", "addTodo", "fetchAccount", "fetchHabits"]),
        handleAddTodo(option: any) {
            console.log("handleAddTodo")
            const userId = this.getAccount["$id"];
            if (!userId) {
                console.log("User id is null/empty");
            } else {
                const data = {
                    content: option.title,
                    habits: option["$id"],
                    isComplete: false,
                    date: new Date().toISOString(),
                };
                this.addTodo({
                    data,
                    userId
                });
            }
        },
    },
    created() {
        if (!this.getAccount) this.fetchAccount();
        this.fetchTodos();
        this.fetchHabits();
    },
};
</script>