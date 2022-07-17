import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js';
import SignView from '../views/Sign.vue';
import ProfilView from '../views/Profil.vue';


const routes = [
    {
        path: '/',
        name: 'SignView',
        component: SignView
    },

    {
        path: '/profil/:uuid',
        name: 'ProfilView',
        component: ProfilView,
        props: true
    },



]

const router = createRouter({

    history: createWebHistory(process.env.BASE_URL),
    linkActiveClass: 'active',
    routes
})

router.beforeEach(async (to) => {

    const publicPages = ['/'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/';
    }
});

export default router