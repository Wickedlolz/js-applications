import * as api from './api.js';

const endpoints = {
    GET_ANIMALS: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    CREATE_ANIMAL: '/data/pets',
    DETAILS_ANIMAL: '/data/pets/',
    EDIT_ANIMAL: '/data/pets/',
    DELETE_ANIMAL: '/data/pets/',
};

export async function getAllAnimals() {
    return api.get(endpoints.GET_ANIMALS);
}

export async function createAnimal(data) {
    return api.post(endpoints.CREATE_ANIMAL, data);
}

export async function getAnimalById(animalId) {
    return api.get(endpoints.DETAILS_ANIMAL + animalId);
}

export async function editAnimalById(animalId, data) {
    return api.put(endpoints.EDIT_ANIMAL + animalId, data);
}

export async function deleteAnimalById(animalId) {
    return api.del(endpoints.DELETE_ANIMAL + animalId);
}
