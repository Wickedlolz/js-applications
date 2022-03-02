window.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (!userData) {
        document.getElementById('user').style.display = 'none';
    } else {
        window.location = '/index.html';
    }
    document.querySelector('form').addEventListener('submit', onRegister);
});

async function onRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    try {
        if (email == '' || password == '' || rePass == '') {
            throw new Error('All fields are required.');
        }

        if (password !== rePass) {
            throw new Error('Passwords does not match!');
        }

        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        const token = data.accessToken;

        sessionStorage.setItem('token', token);
        window.location = '/index.html';
    } catch (error) {
        document.querySelector('.notification').style.display = 'inline-block';
        document.querySelector('.notification').textContent = error.message;

        setTimeout(() => {
            document.querySelector('.notification').style.display = 'none';
            document.querySelector('.notification').textContent = '';
        }, 3000);
    }
}
