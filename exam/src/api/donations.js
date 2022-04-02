import * as api from './api.js';

const endpoints = {
    MAKE_DONATION: '/data/donation',
    TOTAL_DONATIONS: (petId) =>
        `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    DONATIONS_FOR_USER: (petId, userId) =>
        `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function makeDonate(petId) {
    return api.post(endpoints.MAKE_DONATION, { petId });
}

export async function getTotalDonations(petId) {
    return api.get(endpoints.TOTAL_DONATIONS(petId));
}

export async function getDonationsForUser(petId, userId) {
    return api.get(endpoints.DONATIONS_FOR_USER(petId, userId));
}
