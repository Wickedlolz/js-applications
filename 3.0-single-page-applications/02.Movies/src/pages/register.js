import { register } from '../api/users.js';
const registerSection = document.getElementById('form-sign-up');
const form = registerSection.querySelector('form');

form.addEventListener('submit', onRegister);

export function registerPage() {
    registerSection.style.display = 'block';
}

async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repeatPassword = formData.get('repeatPassword').trim();

    try {
        if (email == '' || password == '' || repeatPassword == '') {
            throw new Error('All fields are required!');
        }

        if (password.length < 6) {
            throw new Error('Passwrod must be atleast 6 characters!');
        }

        if (password != repeatPassword) {
            throw new Error('Passwords are not identical!');
        }

        const user = await register({ email, password });

        event.target.reset();
        alert('Register successfully!');
    } catch (error) {
        alert(error.message);
    }
}
