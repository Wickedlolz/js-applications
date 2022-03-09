import { e } from '../dom.js';
import { getMovies } from '../api/data.js';
import { router } from '../router.js';
const homeSection = document.querySelector('.home-view');
const movieContainer = document.getElementById('movie-container');

export async function homePage() {
    const user = localStorage.getItem('user');

    if (user) {
        const userData = JSON.parse(user);
        document.getElementById('createBtn').style.display = 'inline-block';
        document.getElementById('welcome-msg').textContent =
            'Welcome, ' + userData.email;
    } else {
        document.getElementById('welcome-msg').textContent = '';
        document.getElementById('createBtn').style.display = 'none';
    }

    homeSection.style.display = 'block';
    movieContainer.innerHTML = '<p>Loading...</p>';

    const movies = await getMovies();
    const frament = document.createDocumentFragment();
    movies.map(createMovieCard).forEach((m) => frament.appendChild(m));

    movieContainer.replaceChildren(frament);
}

function createMovieCard(movie) {
    const detailsBtn = e(
        'button',
        { type: 'button', className: 'btn btn-info' },
        'Details'
    );

    detailsBtn.dataset.id = movie._id;

    const element = e(
        'div',
        { className: 'card mb-4' },
        e('img', {
            className: 'card-img-top',
            src: movie.img,
            alt: movie.title,
            width: 400,
        }),
        e(
            'div',
            { className: 'card-body' },
            e('h4', { className: 'card-title' }, movie.title)
        ),
        e(
            'div',
            { className: 'card-footer' },
            e('a', { href: movie._id }, detailsBtn)
        )
    );

    detailsBtn.addEventListener('click', (event) => {
        event.preventDefault();
        router('/details', movie._id);
    });

    return element;
}
