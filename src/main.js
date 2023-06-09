import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import '@/assets/style/index.css';

// sử dụng font-awesome
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, fab);
dom.watch();

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

let app;

//
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.component('font-awesome-icon', FontAwesomeIcon);
    app.mount('#app');
  }
});
