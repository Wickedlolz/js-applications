import { getSongById } from './api/data.js';

export function getUserData() {
    const user = sessionStorage.getItem('user');

    if (user) {
        return JSON.parse(user);
    } else {
        return false;
    }
}

export function setUserData(data) {
    sessionStorage.setItem('user', JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem('user');
}

export function loadSong(ctx, next) {
    ctx.songPromise = getSongById(ctx.params.id);
    next();
}
