import * as api from './api.js';

const endpoints = {
    LOGIN: '/users/login',
    REGISTER: '/users/register',
    LOGOUT: '/users/logout',
};

export function login(email, password) {
    return api.post(endpoints.LOGIN, { email, password });
}

export function register(email, password) {
    return api.post(endpoints.REGISTER, { email, password });
}

export function logout() {
    return api.get(endpoints.LOGOUT);
}
