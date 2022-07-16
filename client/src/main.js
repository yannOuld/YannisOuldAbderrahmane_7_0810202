import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';



import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHouse, faUser, faArrowRightFromBracket, faKey } from '@fortawesome/free-solid-svg-icons';

library.add(faHouse, faUser, faArrowRightFromBracket, faKey);



const pinia = createPinia();


createApp(App)
    .use(pinia)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');


