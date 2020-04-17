import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: null,
        user: null
    },

    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER(state, data) {
            state.user = data
        }
    },

    actions: {
        async signIn({ dispatch }, credentials) {
            const response = await axios.post("login", credentials);
            dispatch('attemp', response.data.token)
        },

        async attemp({ commit }, token) {
            commit('SET_TOKEN', token)

            try {
                const response = await axios.get("user", {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                })
                commit('SET_USER', response.data)
            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        }
    }
}