import { getMovieById, editMovie } from '../api/data.js';
import { router } from '../router.js';

const editSection = document.getElementById('edit-movie');
const form = editSection.querySelector('form');

form.addEventListener('submit', onEdit);

export async function editPage() {
    await loadMovie();
    editSection.style.display = 'block';
}

async function onEdit(event) {
    event.preventDefault();
    const movieId = document.getElementById('editBtn').dataset.id;
    const formData = new FormData(event.target);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageUrl').trim();

    if (title == '' || description == '' || img == '') {
        alert('All fields required!');
        return;
    }

    const editedMovie = await editMovie(movieId, { title, description, img });
    router('/details', movieId);
}

async function loadMovie() {
    const movieId = document.getElementById('editBtn').dataset.id;
    const movie = await getMovieById(movieId);

    form.querySelector('#title').value = movie.title;
    form.querySelector('#description').value = movie.description;
    form.querySelector('#imageUrl').value = movie.img;
}
