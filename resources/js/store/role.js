import axios from "axios";

export default {
    namespaced: true,

    state: {
        roles: []
    },

    getters: {
        roles(state) {
            return state.roles
        }
    },

    mutations: {
        SET_ROLES(state, payload) {
            state.roles = payload
        },
        UPDATE_ROLE(state, payload) {
            state.roles.forEach(role => {
                if (role.id === payload.id) {
                    role.title = payload.title
                }
            });
        },
        ADD_ROLE(state, payload) {
            state.roles.push(payload)
        },
        DELETE_ROLE(state, payload) {
            const index = state.roles.map(item => item.id).indexOf(payload);
            console.log(index)
            state.roles.splice(index, 1);
        }
    },

    actions: {
        getAllRoles({ commit }) {
            axios.get("role").then(res => {
                commit("SET_ROLES", res.data)
            })
        },

        addRole({ commit }, payload) {
            axios.post("role", payload).then(res => {
                commit("ADD_ROLE", res.data)
            })
        },

        editRole({ commit }, payload) {
            axios.put("role/" + payload.id, payload).then(res => {
                commit("UPDATE_ROLE", res.data)
            })
        },

        removeRole({ commit }, payload) {
            axios.delete("role/" + payload.id).then(() => {
                commit("DELETE_ROLE", payload.id)
            })
        }
    }
}
