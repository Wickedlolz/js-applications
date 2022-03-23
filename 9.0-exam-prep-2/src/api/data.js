import { get, post, put, del } from './request.js';

const endpoints = {
    ALL_GAMES: '/data/games?sortBy=_createdOn%20desc',
    LATEST_GAMES: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    CREATE_GAME: '/data/games',
    DETAILS_GAME: '/data/games/',
    EDIT_GAME: '/data/games/',
    DELETE_GAME: '/data/games/',
    ALL_COMMENTS: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    CREATE_COMMENT: '/data/comments',
};

export async function getLatestGames() {
    return await get(endpoints.LATEST_GAMES);
}

export async function getAllGames() {
    return await get(endpoints.ALL_GAMES);
}

export async function createGame(data) {
    return await post(endpoints.CREATE_GAME, data);
}

export async function getGameById(id) {
    return await get(endpoints.DETAILS_GAME + id);
}

export async function updateGameById(id, data) {
    return await put(endpoints.EDIT_GAME + id, data);
}

export async function deleteGameById(id) {
    return await del(endpoints.DELETE_GAME + id);
}

export async function getAllComments(gameId) {
    return await get(endpoints.ALL_COMMENTS(gameId));
}

export async function createComment(gameId, comment) {
    return await post(endpoints.CREATE_COMMENT, { gameId, comment });
}
