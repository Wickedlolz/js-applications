import { getFurnitureById } from './api/data.js';

export function setUserData(data) {
    sessionStorage.setItem('user', JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('user'));
}

export function clearUserData() {
    sessionStorage.removeItem('user');
}

export function loadFurniture(ctx, next) {
    ctx.furniturePromise = getFurnitureById(ctx.params.id);
    next();
}
