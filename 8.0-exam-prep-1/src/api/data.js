import { get, post, put, del } from './request.js';

const endpoints = {
    ALL_SONGS: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    CREATE_SONG: '/data/albums',
    DETAILS_SONG: '/data/albums/',
    EDIT_SONG: '/data/albums/',
    DELETE_SONG: '/data/albums/',
    SEARCH: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`,
};

export async function getAllMyBooks(userId) {
    return await get(endpoints.MY_BOOKS(userId));
}

export async function getAllSongs() {
    return await get(endpoints.ALL_SONGS);
}

export async function createSong(data) {
    return await post(endpoints.CREATE_SONG, data);
}

export async function getSongById(id) {
    return await get(endpoints.DETAILS_SONG + id);
}

export async function editSongById(id, data) {
    return await put(endpoints.EDIT_SONG + id, data);
}

export async function deleteSongById(id) {
    return await del(endpoints.DELETE_SONG + id);
}

export async function search(query) {
    return await get(endpoints.SEARCH(query));
}
