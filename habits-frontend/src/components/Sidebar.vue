<template>
    <transition class="transition-all ease-in-out duration-100" leave-from-class="translate-x-0"
        leave-to-class="translate-x-[-5rem]">
        <div v-if="isOpen"
            class="z-9 fixed h-screen w-16 bg-gray-900 text-green-700 flex flex-col m-0 md:py-0 py-12 shadow-lg">
            <div @click="() => navigateTo('/todo')" class=" sidebar-icon">
                <div class="border-green-700 rounded-md w-8 h-8 items-center justify-center text-center mx-auto">
                    <p class="text-xs font-semibold w-full leading-none">{{ moment().format('MMM') }}</p>
                    <p class="text-xl font-semibold w-full leading-none">{{ moment().format('DD') }}</p>
                </div>
            </div>
            <span class="inline-block w-10 h-10 sidebar-icon group">
                <div class="group-hover:bg-green-700 group-hover:text-gray-900 group-hover:rounded-xl sidebar-icon -m-6">
                    <font-awesome-icon :icon="['fas', 'calendar']" />
                </div>
                <input @change="goToTodoDay" type="date" class="datepicker-input">
            </span>
            <div @click="() => navigateTo('/habits')" class=" sidebar-icon">
                <font-awesome-icon :icon="['fas', 'jar-wheat']" />
            </div>
            <hr class="border-gray-500 bottom-32 z-[-2] left-0 absolute w-full">
            <button @click="handleLogout" class="sidebar-icon absolute md:bottom-4 bottom-16 right-2">
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
            </button>
        </div>
    </transition>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import moment from 'moment';
export default {
    name: "Sidebar",
    props: ["navItems", 'isOpen', 'handleCloseSidebar'],
    data() {
        return {
            moment,
        };
    },
    methods: {
        ...mapActions(["logout",]),
        handleLogout() {
            this.logout();
        },
        handleNavItemClick(path: string) {
            return () => this.navigateTo(path);
        },
        navigateTo(path: string) {
            this.$router.push(path);
            this.$props.handleCloseSidebar();
        },
        goToTodoDay(e: any) {
            this.$router.push(`/todo/${moment(e.target.value).format('YYYY-MM-DD')}`);
            this.$props.handleCloseSidebar();
        }
    }
}
</script>