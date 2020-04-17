window.Vue = require('vue');
window.Vuetify = require('vuetify')
import router from "./router";
import App from "./components/App.vue";
import store from "./store";

require('./bootstrap');

Vue.use(Vuetify);

const vuetify = new Vuetify();

const app = new Vue({
    el: '#app',
    components: { App },
    router,
    vuetify,
    store,
});

