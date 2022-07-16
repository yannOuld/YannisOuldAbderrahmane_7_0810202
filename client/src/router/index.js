import { createRouter, createWebHistory } from 'vue-router'
import SignView from '../views/Sign.vue';
import ProfilView from '../views/Profil.vue';


const routes = [
    {
        path: '/',
        name: 'SignView',
        component: SignView
    },

    {
        path: '/profil',
        name: 'ProfilView',
        component: ProfilView
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router