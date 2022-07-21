import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp.js";




// store d'authentification du user
export const useAuthStore = defineStore({
    id: 'auth',

    // States pinia user du localStorage et url de retour en cas de clear du localStorage 
    state: () => ({
        userData: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),

    actions: {
        // fonction de connection
        async login(formData) {
            //fetch post login dans une variable
            const userData = await fetchWrapper.post(`http://localhost:3000/api/user/login`, formData);

            // mise a jour du store avec la variable 
            this.userData = userData;

            // inscription du user dans le localStorage 
            localStorage.setItem('user', JSON.stringify(userData));

        },

        //fonction de déconnection 
        logout() {
            // user du store mis a null
            this.userData = null;

            //enlever le user du localStorage 
            localStorage.removeItem('user');

        },


    },




})