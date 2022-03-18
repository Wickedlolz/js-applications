import { get, post, put, del } from './api.js';

const endpoints = {
    CREATE_FURNITURE: '/data/catalog',
    ALL_FURNITURE: '/data/catalog',
    FURNITURE_DETAILS: '/data/catalog/',
    UPDATE_FURNITURE: '/data/catalog/',
    DELETE_FURNITURE: '/data/catalog/',
    MY_FURNITURE: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
};

export async function getAllFurniture() {
    return await get(endpoints.ALL_FURNITURE);
}

export async function createFurniture(data) {
    return await post(endpoints.CREATE_FURNITURE, data);
}

export async function getFurnitureById(id) {
    return await get(endpoints.FURNITURE_DETAILS + id);
}

export async function getMyFurniture(userId) {
    return await get(endpoints.MY_FURNITURE(userId));
}

export async function updateFurniture(id, data) {
    return await put(endpoints.UPDATE_FURNITURE + id, data);
}

export async function deleteFurnitureById(id) {
    return await del(endpoints.DELETE_FURNITURE + id);
}
