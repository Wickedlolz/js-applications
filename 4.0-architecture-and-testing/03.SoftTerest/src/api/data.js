import * as api from './api.js';

const endpoints = {
    GET_IDEAS: '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    POST_IDEA: '/data/ideas',
    GET_IDEA_BY_ID: '/data/ideas/',
    DELETE_IDEA_BY_ID: '/data/ideas/',
};

export async function getAllIdeas() {
    return api.get(endpoints.GET_IDEAS);
}

export async function createIdea(ideaData) {
    return api.post(endpoints.POST_IDEA, ideaData);
}

export async function ideaById(id) {
    return api.get(endpoints.GET_IDEA_BY_ID + id);
}

export async function deleteIdeaById(id) {
    return api.delete(endpoints.DELETE_IDEA_BY_ID + id);
}
