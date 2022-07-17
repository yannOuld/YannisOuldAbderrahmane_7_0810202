import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { fetchWrapper } from "../utils/fetchWrapp.js";




// store d'authentification du user
export const useAuthStore = defineStore({
    id: 'auth',

    // States pinia user du localStorage et url de retour en cas de clear du localStorage 
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),

    actions: {
        // fonction de connection
        async login(formData) {
            const user = await fetchWrapper.post(`http://localhost:3000/api/user/login`, formData);

            // mise a jour du user du store
            this.user = user;

            // inscription du user dans le localStorage 
            localStorage.setItem('user', JSON.stringify(user));

        },
    },
    //fonction de déconnection 
    logout() {
        // user du store mis a null
        this.user = null;

        //enlever le user du localStorage 
        localStorage.removeItem('user');

        //retour à l'écran de connection 
        const router = useRouter();
        router.push('/');
    }




})