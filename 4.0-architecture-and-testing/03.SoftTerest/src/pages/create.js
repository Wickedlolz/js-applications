import { createIdea } from '../api/data.js';

const createSection = document.getElementById('create-view');
const form = createSection.querySelector('form');
form.addEventListener('submit', onCreate);

let ctx = null;

export function showCreate(context) {
    ctx = context;
    context.showSection(createSection);
}

async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageURL').trim();

    await createIdea({
        title,
        description,
        img,
    });

    form.reset();
    ctx.redirect('/dashboard');
}
