import { html, render } from './node_modules/lit-html/lit-html.js';

import { cats } from './catSeeder.js';
const allCatsContainer = document.getElementById('allCats');

const catListTemplate = (cat) => html`
    <li>
        <img
            src="./images/${cat.imageLocation}.jpg"
            width="250"
            height="250"
            alt="Card image cap"
        />
        <div class="info">
            <button class="showBtn" @click=${onToggle}>Show status code</button>
            <div class="status" style="display: none" id="${cat.id}">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
`;

const catsStatusList = (cats) => html`
    <ul>
        ${cats.map(catListTemplate)}
    </ul>
`;

function onToggle(event) {
    const hiddenDiv = event.target.parentElement.querySelector('div .status');

    if (event.target.textContent == 'Show status code') {
        hiddenDiv.style.display = 'block';
        event.target.textContent = 'Hide status code';
    } else if (event.target.textContent == 'Hide status code') {
        hiddenDiv.style.display = 'none';
        event.target.textContent = 'Show status code';
    }
}

render(catsStatusList(cats), allCatsContainer);
