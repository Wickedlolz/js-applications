import { login } from '../api/users.js';

const loginSection = document.getElementById('login-view');
const form = loginSection.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export function showLogin(context) {
    ctx = context;
    context.showSection(loginSection);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    await login(email, password);

    form.reset();
    ctx.updateNav();
    ctx.redirect('/');
}
