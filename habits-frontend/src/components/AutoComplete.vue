<template>
    <div id="autocomplete" class="relative w-full overflow-visible">
        <input v-on:keyup.enter="handleSubmit" v-on:focus="handleFocus" type="text" v-model="content"
            class="relative w-full px-6 py-4 text-xl rounded-lg border-0 focus:ring-2 focus:ring-gray-800 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl shadow-md"
            placeholder="🤔   What to do today?" />
        <transition class="absolute" leave-active-class="transition-all ease-in-out duration-1000"
            leave-from-class="opacity-150" leave-to-class="opacity-0 my-0" @after-leave="focus = false">
            <div class="absolute z-10 mt-1 max-h-60 w-full">
                <ul v-if="(focus && options && options.length > 0)"
                    class="w-full z-10 list-none mt-1 max-h-56 overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <div v-on:click="(e) => handleOptionsSelect(e, option)" as="template" v-for="option in options"
                        :key="option.id" :value="option">
                        <li
                            :class="['text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9', 'hover:bg-gray-100']">
                            <div class="flex items-center">
                                <!-- <img :src="person.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
                                <span :class="['font-normal', 'ml-3 block truncate']">{{ option.title
                                }}</span>
                            </div>
                        </li>

                    </div>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">

export default {
    name: "AutoComplete",
    content: "",
    data() {
        return {
            focus: false,
            content: ""
        };
    },
    props: ["onSubmit", "options", "filterFunction"],
    methods: {
        handleSubmit(e: any) {
            e.preventDefault();
            this.onSubmit({ title: this.content });
            this.content = "";
        },
        handleOptionsSelect(e: Event, option: any) {
            e.preventDefault();
            this.handleBlur();
            console.log(this.$props.options)
            console.log({ ...option })
            this.onSubmit(option);
        },
        handleBlur() {
            document.removeEventListener("click", this.clickOutsideHandler);
            this.focus = false;
        },
        handleFocus() {
            this.focus = true;
            document.addEventListener("click", this.clickOutsideHandler);
        },
        clickOutsideHandler(event: any) {
            var myDiv = document.getElementById("autocomplete");

            // Check if the click event target is outside of the div
            if (myDiv && event.target && !myDiv.contains(event.target as Node)) {
                // Clicked outside of the div, do something
                this.handleBlur()
            }
        },
    }
}
</script>
