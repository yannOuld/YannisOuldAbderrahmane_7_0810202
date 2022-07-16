import { defineStore } from "pinia";
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';






export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: ref(
            useLocalStorage("user", {
                userData: {},
            })
        ),
        token: ref(
            useLocalStorage('token', {
                token: ''
            })
        ),
        isLoggedIn: false,


    }),

    actions: {

    },




})