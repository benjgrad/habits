<template>
    <section class="container px-3 max-w-xl mx-auto flex flex-col">
        <div class="p-16 text-center ">
            <div class="flex content-between items-center w-full text-center text-4xl md:text-5xl lg:text-6xl">

                <div class="peer w-full flex mr-[-50%]">
                    <router-link :to="`/todo/${moment(pageDate).subtract(1, 'day').format('YYYY-MM-DD')}`"
                        class="transition-all ease-in-out duration-1000 rounded-lg hover:bg-gray-100 opacity-0 hover:opacity-60 py-3 w-1/2">
                        <font-awesome-icon :icon="['fas', 'arrow-left']" />
                    </router-link>
                    <router-link :to="`/todo/${moment(pageDate).add(1, 'day').format('YYYY-MM-DD')}`"
                        class="transition-all ease-in-out duration-1000 rounded-lg hover:bg-gray-100 opacity-0 hover:opacity-60 py-3 w-1/2">
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    </router-link>
                </div>
                <div
                    class="transition-all duration-700 peer-hover:blur-sm  w-full z-[-1] my-3 font-bold text-4xl md:text-5xl lg:text-6xl ml-[-50%]">
                    {{ pageTitle }}
                </div>

            </div>

            <AutoComplete :options="getHabits" :onSubmit="handleAddTodo" />

            <ul>
                <todo-item v-for=" item  in  todos.filter((o: any) => {
                    return moment(o.date).isSame(moment(pageDate), 'day')
                })" :key="item['$id']" :todo="item" />
            </ul>
        </div>
    </section>
</template>
<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import { Query } from "appwrite";
import TodoItem from "./TodoItem.vue";
import AutoComplete from "./AutoComplete.vue";
import moment from "moment";



export default {
    components: { TodoItem, AutoComplete },
    name: "Todo",
    props: ["date"],
    data() {
        return {
            moment,
            date: moment(),
        };
    },
    computed: {
        ...mapGetters(["todos", "getAccount", "getHabits"]),
        pageTitle() {
            return moment(this.$route.params.date).format("dddd MMMM DD");
        },
        pageDate() {
            return moment(this.$route.params.date).format("YYYY-MM-DD");
        },
    },
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
                    date: moment(this.$route.params.date).toISOString(),
                };
                this.addTodo({
                    data,
                    userId
                });
            }
        },
    },
    created() {
        console.log(this.$route.params.date)
        if (!this.getAccount) this.fetchAccount();
        console.log(moment().toISOString(), moment(this.$route.params.date).format())
        this.fetchTodos();
        this.fetchHabits();
    },
};
</script>