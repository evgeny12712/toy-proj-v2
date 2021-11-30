import { userService } from '../services/user-service.js'
export const userStore = {
    strict: true,
    state: {
        user: null
    },
    getters: {
        loggedInUser(state) {
            return state.user
        }
    },
    mutations: {
        loggedUser(state) {
            state.user = userService.getLoggedinUser()
        }
    },
    actions: {
        async loginUser({ commit }, { user }) {
            const loggedUser = await userService.login(user)
            commit({ type: 'loggedUser', user: loggedUser })
            return loggedUser
        },
        async signUpUser({ commit }, { user }) {
            const loggedUser = await userService.signup(user)
            commit({ type: 'loggedUser', user: loggedUser })
            return loggedUser
        },
        async logout({ commit }) {
            const msg = await userService.logout()
            commit({ type: 'loggedUser', user: null })
            return msg
        }
    }
}