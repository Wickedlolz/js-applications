import { createMovie } from '../api/data.js';
import { router } from '../router.js';

const addMovieSection = document.getElementById('add-movie');
const form = addMovieSection.querySelector('form');

form.addEventListener('submit', onCreate);

export function createPage() {
    let user = localStorage.getItem('user');

    if (!user) {
        router('/');
    }

    addMovieSection.style.display = 'block';
}

async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const imageUrl = formData.get('imageUrl').trim();

    if (title == '' || description == '' || imageUrl == '') {
        alert('All fields are required!');
        return;
    }

    const createdMovie = await createMovie({
        title,
        description,
        img: imageUrl,
    });

    event.target.reset();
    router('/');
}
