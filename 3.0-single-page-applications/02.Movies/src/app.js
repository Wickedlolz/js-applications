import { router } from './router.js';
import { updateNav } from './auth.js';
const navigation = document.querySelector('nav');
router('/');
updateNav();

document.getElementById('logoutBtn').addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.clear();
    updateNav();
    router('/');
});

document.getElementById('createBtn').addEventListener('click', (event) => {
    event.preventDefault();
    router('/create');
});

navigation.addEventListener('click', (event) => {
    event.preventDefault();

    if (event.target.tagName == 'A' && event.target.id != 'logoutBtn') {
        const url = new URL(event.target.href);
        router(url.pathname);
    }
});
