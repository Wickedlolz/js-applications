const guestNav = document.querySelectorAll('.guest');
const userNav = document.querySelectorAll('.user');

export function updateNav() {
    const user = localStorage.getItem('user');

    if (user) {
        Array.from(userNav).forEach((x) => (x.style.display = 'inline-block'));
        Array.from(guestNav).forEach((x) => (x.style.display = 'none'));
    } else {
        Array.from(guestNav).forEach((x) => (x.style.display = 'inline-block'));
        Array.from(userNav).forEach((x) => (x.style.display = 'none'));
    }
}
