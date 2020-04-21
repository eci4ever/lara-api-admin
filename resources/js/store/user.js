import axios from "axios";

export default {
    namespaced: true,

    state: {
        users: []
    },

    getters: {
        users(state) {
            return state.users
        },
    },

    mutations: {
        SET_USERS(state, payload) {
            state.users = payload
        },
        ADD_USER(state, payload) {
            state.users.push(payload)
        },
        UPDATE_USER(state, payload) {
            state.users.forEach(user => {
                if (user.id === payload.id) {
                    user.name = payload.name
                }
            });
        },
        DELETE_USER(state, payload) {
            const index = state.users.map(item => item.id).indexOf(payload);
            console.log(index)
            state.users.splice(index, 1);
        }
    },

    actions: {
        getAllUsers({ commit }) {
            axios.get("user").then(res => {
                commit("SET_USERS", res.data)
            })
        },

        addUser({ commit }, payload) {
            axios.post("user", payload).then(res => {
                commit("ADD_USER", res.data)
            })
        },

        editUser({ commit }, payload) {
            axios.put("user/" + payload.id, payload).then(res => {
                commit("UPDATE_USER", res.data)
            })
        },

        removeUser({ commit }, payload) {
            axios.delete("user/" + payload.id).then(() => {
                commit("DELETE_USER", payload.id)
            })
        }
    }
}
