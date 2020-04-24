import axios from "axios";

export default {
    namespaced: true,

    state: {
        permissions: []
    },

    getters: {
        permissions(state) {
            return state.permissions
        }
    },

    mutations: {
        SET_PERMISSIONS(state, payload) {
            state.permissions = payload
        },
        UPDATE_PERMISSION(state, payload) {
            state.permissions.forEach(permission => {
                if (permission.id === payload.id) {
                    permission.title = payload.title
                }
            });
        },
        ADD_PERMISSION(state, payload) {
            state.permissions.push(payload)
        },
        DELETE_PERMISSION(state, payload) {
            const index = state.permissions.map(item => item.id).indexOf(payload);
            console.log(index)
            state.permissions.splice(index, 1);
        }
    },

    actions: {
        getAllPermissions({ commit }) {
            axios.get("permission").then(res => {
                commit("SET_PERMISSIONS", res.data)
            })
        },

        addPermission({ commit }, payload) {
            axios.post("permission", payload)
        },

        editPermission({ commit }, payload) {
            axios.put("permission/" + payload.id, payload).then(res => {
                commit("UPDATE_PERMISSION", res.data)
            })
        },

        removePermission({ commit }, payload) {
            axios.delete("permission/" + payload.id).then(() => {
                commit("DELETE_PERMISSION", payload.id)
            })
        }
    }
}
