import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import role from "./role";
import user from "./user"
import permission from "./permission"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //
    },

    getters: {
        //
    },

    mutations: {
        //
    },

    actions: {
        //
    },

    modules: {
        auth,
        role,
        user,
        permission
    }
})