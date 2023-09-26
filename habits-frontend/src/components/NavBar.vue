<template>
    <div :class="[isSmallScreen ? '' : 'hidden', 'fixed top-0 left-0 right-0 bg-gray-200 z-10']">
        <div class=" flex items-center my-2 mx-2">
            <button @click="isOpen = !isOpen" class="outline-none mobile-menu-button">
                <svg class="w-8 h-8 text-gray-500" x-show="!showMenu" fill="none" stroke-linecap="round"
                    stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
    </div>

    <Sidebar :handleCloseSidebar="() => { }" :isOpen="isOpen" />
    <div @click="handleCloseSidebar" class="absolute z-[-1] top-0 left-0  h-full right-0 overflow-hidden">
        <div
            :class="['transition-all md:top-0 top-12 h-full overflow-scroll', isOpen ? 'ml-16 mr-[-4rem]' : 'mx-0', isOpen && isSmallScreen ? 'blur-sm' : 'blur-none']">
            <router-view />
        </div>
    </div>
</template>
<script lang="ts">
import Sidebar from './Sidebar.vue';
import moment from 'moment';

export default {
    name: "Navbar",
    data() {
        return {
            moment,
            isOpen: !(window.innerWidth < 768),
            isSmallScreen: window.innerWidth < 768,
        };
    },
    components: { Sidebar },

    mounted() {
        // Add an event listener to handle window resize
        window.addEventListener('resize', this.handleWindowResize);
    },
    methods: {
        // Handle window resize event
        handleWindowResize() {
            if (!this.isSmallScreen && window.innerWidth < 768)
                this.isOpen = false;
            if (this.isSmallScreen && window.innerWidth >= 768)
                this.isOpen = true;
            this.isSmallScreen = window.innerWidth < 768;
        },
        handleCloseSidebar() {
            if (this.isSmallScreen) {
                this.isOpen = false;
            }
        }
    },
    unmounted() {
        // Remove the event listener when the component is destroyed
        window.removeEventListener('resize', this.handleWindowResize);
    },

}
</script>