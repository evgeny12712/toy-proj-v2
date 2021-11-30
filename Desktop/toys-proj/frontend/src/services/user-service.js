import Axios from 'axios';
const axios = Axios.create({ withCredentials: true, });
// const axios = require('axios')
const USER_URL = 'http://localhost:3030/api/user/'
const AUTH_URL = 'http://localhost:3030/api/auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser
}

async function login(user) {
    try {
        const res = await axios.post(AUTH_URL + 'login', user)
        const loggedUser = res.data
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(loggedUser))
        return loggedUser
    } catch (error) {
        console.log('error', error)
    }
}

async function signup(user) {
    try {
        const res = await axios.post(AUTH_URL + 'signup', user)
        const loggedUser = res.data
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(loggedUser))
        return loggedUser
    } catch (error) {
        console.log('error', error)
    }
}

async function logout() {
    try {
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
        const status = await axios.post(AUTH_URL + 'logout')
        return status
    } catch (error) {
        console.log('error', error);
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Noya', score: 22})
// userService.login({username: 'muki', password: 'muki1'})