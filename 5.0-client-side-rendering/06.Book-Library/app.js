import { html, render } from './node_modules/lit-html/lit-html.js';
import * as api from './api.js';

const bookRow = ([id, book]) => html`
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button @click=${() => onEdit(id)}>Edit</button>
            <button @click=${() => onDelete(id)}>Delete</button>
        </td>
    </tr>
`;

const pageTemplate = (books) => html`
    <button id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            ${books.map(bookRow)}
        </tbody>
    </table>

    <section id="forms"></section>
`;

const addFormTemplate = () => html`
    <form id="add-form" @submit=${onCreateBook}>
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." />
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." />
        <input type="submit" value="Submit" />
    </form>
`;

const editFormTemplate = (id, book) => html`
    <form id="edit-form" @submit=${(e) => onEditFormClick(e, id)}>
        <input type="hidden" name="id" value="${id}" />
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input
            type="text"
            name="title"
            placeholder="Title..."
            value="${book.title}"
        />
        <label>AUTHOR</label>
        <input
            type="text"
            name="author"
            placeholder="Author..."
            value="${book.author}"
        />
        <input type="submit" value="Save" />
    </form>
`;

async function start() {
    onLoadAllBooks();
}

start();

async function onLoadAllBooks(event) {
    const books = await api.getAllBooks();
    render(pageTemplate(books), document.querySelector('body'));
    render(addFormTemplate(), document.getElementById('forms'));
}

async function onEdit(id) {
    const book = await api.getBookById(id);

    render(editFormTemplate(id, book), document.getElementById('forms'));
}

async function onEditFormClick(event, id) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get('title').trim();
    const author = formData.get('author').trim();

    await api.updateBook(id, { title, author });

    event.target.reset();
    const books = await api.getAllBooks();
    render(pageTemplate(books), document.querySelector('body'));
    render(addFormTemplate(), document.getElementById('forms'));
}

async function onCreateBook(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const title = formData.get('title').trim();
    const author = formData.get('author').trim();

    await api.createBook({ title, author });

    const books = await api.getAllBooks();

    event.target.reset();
    render(pageTemplate(books), document.querySelector('body'));
}

async function onDelete(id) {
    await api.deleteBookById(id);
    const books = await api.getAllBooks();
    render(pageTemplate(books), document.querySelector('body'));
}
