import {
    getMovieById,
    deleteMovie,
    likeMovie,
    getMovieLikes,
} from '../api/data.js';
import { e } from '../dom.js';
import { router } from '../router.js';

const detailsSection = document.getElementById('movie-example');
const movieContainer = detailsSection.querySelector('.container');

export async function detailsPage(id) {
    detailsSection.style.display = 'block';
    movieContainer.innerHTML = '<p>Loading...</p>';

    const movie = await getMovieById(id);
    const movieLikes = await getMovieLikes(movie._id);
    movieContainer.replaceChildren(createMoviDetailsCard(movie, movieLikes));
}

function createMoviDetailsCard(movie, movieLikes) {
    let user = localStorage.getItem('user');

    if (user) {
        user = JSON.parse(localStorage.getItem('user'));
    }

    const deleteBtn = e(
        'a',
        { className: 'btn btn-danger', href: '#' },
        'Delete'
    );

    const editBtn = e(
        'a',
        { className: 'btn btn-warning', id: 'editBtn', href: '#' },
        'Edit'
    );

    const likeBtn = e('span', { className: 'btn btn-primary' }, 'Like');
    const likesBtn = e(
        'span',
        { className: 'enrolled-span' },
        'Like ' + movieLikes
    );

    const element = e(
        'div',
        { className: 'row bg-light text-dark' },
        e('h1', {}, `Movie Title: ${movie.title}`),
        e(
            'div',
            { className: 'col-md-8' },
            e('img', {
                className: 'img-thumbnail',
                src: movie.img,
                alt: movie.title,
            })
        ),
        e(
            'div',
            { className: 'col-md-4 text-center' },
            e('h3', { className: 'my-3' }, 'Movie Description'),
            e('p', {}, movie.description),
            user && user._id == movie._ownerId ? deleteBtn : '',
            user && user._id == movie._ownerId ? editBtn : '',
            user && user._id != movie._ownerId ? likeBtn : '',
            user && user._id != movie._ownerId ? likesBtn : ''
        )
    );

    editBtn.dataset.id = movie._id;

    deleteBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        await deleteMovie(movie._id);
        router('/');
    });

    editBtn.addEventListener('click', (event) => {
        event.preventDefault();
        router('/edit', movie.id);
    });

    likeBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const likedMovie = await likeMovie(movie._id);
        router('/details', movie._id);
    });

    return element;
}
