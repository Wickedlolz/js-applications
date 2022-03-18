import { get, post } from './api.js';

const endpoints = {
    LOGIN: '/users/login',
    REGISTER: '/users/register',
    LOGOUT: '/users/logout',
};

export async function login(email, password) {
    return await post(endpoints.LOGIN, { email, password });
}

export async function register(email, password) {
    return await post(endpoints.REGISTER, { email, password });
}

export async function logout() {
    return await get(endpoints.LOGOUT);
}
