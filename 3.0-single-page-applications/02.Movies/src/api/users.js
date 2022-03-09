const url = 'http://localhost:3030/users/';

export async function login(data) {
    try {
        const response = await fetch(url + 'login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const user = await response.json();

        return user;
    } catch (error) {
        alert(error.message);
    }
}

export async function register(data) {
    try {
        const response = await fetch(url + 'register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const user = await response.json();

        return user;
    } catch (error) {
        alert(error.message);
    }
}
