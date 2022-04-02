export function getUserData() {
    const user = sessionStorage.getItem('user');

    if (user) {
        return JSON.parse(user);
    } else {
        return false;
    }
}

export function setUserData(userData) {
    sessionStorage.setItem('user', JSON.stringify(userData));
}

export function clearUserData() {
    sessionStorage.removeItem('user');
}
