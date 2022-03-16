import { html, render } from './node_modules/lit-html/lit-html.js';
const root = document.getElementById('root');

const townListTemplate = (towns) => html`
    <ul>
        ${towns.map((t) => html`<li>${t}</li>`)}
    </ul>
`;

const form = document.querySelector('.content');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const towns = formData.get('towns');

    const splittedTowns = towns.split(', ');

    if (towns != '') {
        render(townListTemplate(splittedTowns), root);
    }
}
