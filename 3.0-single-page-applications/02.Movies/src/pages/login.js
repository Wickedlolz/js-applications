import { login } from '../api/users.js';
import { updateNav } from '../auth.js';
import { router } from '../router.js';
const loginSection = document.getElementById('form-login');
const form = loginSection.querySelector('form');

form.addEventListener('submit', onLogin);

export async function loginPage() {
    loginSection.style.display = 'block';
}

async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    const user = await login({ email, password });

    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        event.target.reset();
        updateNav();
        router('/');
    }
}
