<template>
    <transition class="transition-all ease-in-out duration-100" leave-from-class="translate-x-0"
        leave-to-class="translate-x-[-5rem]">
        <div v-if="isOpen"
            class="z-9 fixed h-screen w-16 bg-gray-900 text-green-700 flex flex-col m-0 md:py-0 py-12 shadow-lg">
            <router-link @click="console.log" to="/todo" class=" sidebar-icon">
                <div class="border-green-700 rounded-md w-8 h-8 items-center justify-center text-center mx-auto">
                    <p class="text-xs font-semibold w-full leading-none">{{ moment().format('MMM') }}</p>
                    <p class="text-xl font-semibold w-full leading-none">{{ moment().format('DD') }}</p>
                </div>
            </router-link>
            <router-link to="/habits" class=" sidebar-icon">
                <font-awesome-icon :icon="['fas', 'jar-wheat']" />
            </router-link>
            <button @click="handleLogout" class="sidebar-icon">
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
    props: ["navItems", 'isOpen'],
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
    }
}
</script>