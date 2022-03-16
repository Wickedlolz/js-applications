import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const townTemplate = (town, isSearched) =>
    html`<li ${isSearched ? "class: 'active'" : ''}>${town}</li>`;

const townListTemplate = (towns) =>
    html`<ul>
        ${towns.map(townTemplate)}
    </ul>`;

render(townListTemplate(towns), document.getElementById('towns'));

document.querySelector('button').addEventListener('click', search);

function search(event) {
    document.getElementById('result').textContent = '';
    document
        .querySelectorAll('#towns ul li')
        .forEach((x) => x.classList.remove('active'));

    const searchedTown = document.getElementById('searchText');

    if (searchedTown.value == '') {
        document.getElementById('result').textContent = 'Input field is empty.';
        return;
    }

    let counter = 0;

    const searchedTownToLowerCase = searchedTown.value.toLocaleLowerCase();

    document.querySelectorAll('#towns ul li').forEach((x) => {
        if (
            x.textContent.toLocaleLowerCase().includes(searchedTownToLowerCase)
        ) {
            x.classList.add('active');
            counter++;
        }
    });

    document.getElementById('result').textContent = `${counter} matches found`;
}
