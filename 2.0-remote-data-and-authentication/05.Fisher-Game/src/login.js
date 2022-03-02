window.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (!userData) {
        document.getElementById('user').style.display = 'none';
    } else {
        window.location = '/index.html';
    }

    const form = document.querySelector('form');
    form.addEventListener('submit', onLogin);
});

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try {
        if (email == '' || password == '') {
            throw new Error('All fields are required!');
        }

        const response = await fetch('http://localhost:3030/users/login', {
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
        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken,
        };

        sessionStorage.setItem('userData', JSON.stringify(userData));
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
