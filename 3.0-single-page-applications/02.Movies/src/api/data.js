const url = 'http://localhost:3030/data/movies';

export async function getMovies() {
    try {
        const response = await fetch(url);

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const movies = await response.json();

        return movies;
    } catch (error) {
        alert(error.message);
    }
}

export async function editMovie(id, data) {
    const user = localStorage.getItem('user');

    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': JSON.parse(user).accessToken,
            },
            body: JSON.stringify(data),
        });

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const updatedMovie = await response.json();
        return updatedMovie;
    } catch (error) {
        alert(error.message);
    }
}

export async function getMovieById(id) {
    try {
        const response = await fetch(`${url}/${id}`);

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const movie = await response.json();

        return movie;
    } catch (error) {
        alert(error.message);
    }
}

export async function createMovie(data) {
    const user = localStorage.getItem('user');

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': JSON.parse(user).accessToken,
            },
            body: JSON.stringify(data),
        });

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const movies = await response.json();

        return movies;
    } catch (error) {
        alert(error.message);
    }
}

export async function deleteMovie(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'delete',
            headers: {
                'X-Authorization': user.accessToken,
            },
        });

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const deletedMovie = await response.json();
        return deletedMovie;
    } catch (error) {
        alert(error.message);
    }
}

export async function likeMovie(id) {
    const user = localStorage.getItem('user');

    try {
        const response = await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': JSON.parse(user).accessToken,
            },
            body: JSON.stringify({ movieId: id }),
        });

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const likedMovie = await response.json();
        return likedMovie;
    } catch (error) {
        alert(error.message);
    }
}

export async function getMovieLikes(movieId) {
    const likesUrl = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`;

    try {
        const response = await fetch(likesUrl);

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const likes = await response.json();
        return likes;
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
}

// 1240549d-f0e0-497e-ab99-eb8f703713d7
