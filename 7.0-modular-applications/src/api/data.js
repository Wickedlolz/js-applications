import { get, post, put, del } from './request.js';

const endpoints = {
    ALL_BOOKS: '/data/books?sortBy=_createdOn%20desc',
    CREATE_BOOK: '/data/books',
    DETAILS_BOOK: '/data/books/',
    EDIT_BOOK: '/data/books/',
    DELETE_BOOK: '/data/books/',
    MY_BOOKS: (userId) =>
        `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    SEARCH: (querystring) => `/data/cars?where=year%3D${querystring}`,
    LIKE: '/data/likes',
    ALL_LIKES: (bookId) =>
        `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
};

export async function getAllMyBooks(userId) {
    return await get(endpoints.MY_BOOKS(userId));
}

export async function getAllBooks() {
    return await get(endpoints.ALL_BOOKS);
}

export async function createBook(data) {
    return await post(endpoints.CREATE_BOOK, data);
}

export async function getBookById(id) {
    return await get(endpoints.DETAILS_BOOK + id);
}

export async function updateBookById(id, data) {
    return await put(endpoints.EDIT_BOOK + id, data);
}

export async function deleteBookById(id) {
    return await del(endpoints.DELETE_BOOK + id);
}

export async function search(query) {
    return await get(endpoints.SEARCH(query));
}

export async function likeBook(bookId) {
    return await post(endpoints.LIKE, { bookId });
}

export async function getAllLikes(bookId) {
    return await get(endpoints.ALL_LIKES(bookId));
}
