import { getGameById } from './api/data.js';

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('user'));
}

export function setUserData(data) {
    sessionStorage.setItem('user', JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem('user');
}

export async function loadGame(ctx, next) {
    ctx.gamePromise = getGameById(ctx.params.id);
    next();
}
