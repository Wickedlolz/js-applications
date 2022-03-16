import { register } from '../api/users.js';

const registerSection = document.getElementById('register-view');
const form = registerSection.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export function showRegister(context) {
    ctx = context;
    context.showSection(registerSection);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repeatPassword = formData.get('repeatPassword').trim();

    if (password != repeatPassword) {
        alert('Passwords doest not match!');
        return;
    }

    await register(email, password);

    form.reset();
    ctx.updateNav();
    ctx.redirect('/login');
}
