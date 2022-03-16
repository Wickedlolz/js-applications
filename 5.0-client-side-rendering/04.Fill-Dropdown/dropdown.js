import { html, render } from './node_modules/lit-html/lit-html.js';

const optionTemplate = (options) =>
    html`${options.map(
        (o) => html`<option value="${o._id}">${o.text}</option>`
    )}`;

// Using top level await here
const items = await getAllItems();
render(optionTemplate(items), document.getElementById('menu'));

document.querySelector('form').addEventListener('submit', addItem);

async function addItem(event) {
    event.preventDefault();

    const itemText = document.getElementById('itemText');

    await postItem({ text: itemText.value });

    const items = await getAllItems();

    render(optionTemplate(items), document.getElementById('menu'));
    itemText.value = '';
}

async function getAllItems() {
    const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

    try {
        const response = await fetch(url);

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const items = await response.json();
        return Object.values(items);
    } catch (error) {
        alert(error.message);
    }
}

async function postItem(data) {
    const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

    try {
        const response = await fetch(url, {
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

        const newItem = await response.json();

        return newItem;
    } catch (error) {
        alert(error.message);
    }
}
