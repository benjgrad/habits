<template>
    <div :class="[
        `z-10 bg-${color}-500`,
        'text-white px-6 py-4 border-0 rounded absolute right-0 mt-10 mr-10',
    ]">
        <span class="text-xl inline-block mr-5 align-middle">
            <i class="fas fa-bell" />
        </span>
        <span class="inline-block align-middle font-semibold mr-8">
            {{ message }}
        </span>
        <button @click="dismissAlert"
            class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
            <span>×</span>
        </button>
    </div>
</template>
  
<script lang="ts">
import { mapMutations } from "vuex";
import { defineComponent, PropType } from "vue";

export default defineComponent({
    name: "Alert",
    props: {
        message: String as PropType<string>,
        color: String as PropType<string>,
    },
    data() {
        return {
            timeout: null as ReturnType<typeof setTimeout> | null,
        };
    },
    methods: {
        ...mapMutations(["setError"]),
        dismissAlert() {
            this.setError({ show: false });
            this.timeout && clearTimeout(this.timeout);
        },
    },
    created() {
        this.timeout = setTimeout(() => this.setError({ show: false }), 2000);
    },
    beforeUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    },
});
</script>
  