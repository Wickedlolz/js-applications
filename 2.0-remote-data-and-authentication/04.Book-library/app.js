const tbody = document.querySelector('tbody');
const createForm = document.getElementById('create-form');
const editForm = document.getElementById('edit-form');

document.getElementById('loadBooks').addEventListener('click', loadBooks);
createForm.addEventListener('submit', onCreate);
editForm.addEventListener('submit', onEditSubmit);

tbody.addEventListener('click', onTableClick);

async function onEditSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const id = formData.get('id');
    const author = formData.get('author').trim();
    const title = formData.get('title').trim();

    const result = await updateBook(id, { author, title });

    event.target.reset();
    createForm.style.display = 'block';
    editForm.style.display = 'none';

    loadBooks();
}

function onTableClick(event) {
    if (event.target.className == 'deleteBtn') {
        onDelete(event.target);
    } else if (event.target.className == 'editBtn') {
        onEdit(event.target);
    }
}

async function onEdit(button) {
    const id = button.dataset.id;
    const book = await loadBookById(id);

    createForm.style.display = 'none';
    editForm.style.display = 'block';

    editForm.querySelector('[name="author"]').value = book.author;
    editForm.querySelector('[name="title"]').value = book.title;
    editForm.querySelector('[name="id"]').value = id;
}

async function onDelete(button) {
    const id = button.dataset.id;
    await deleteBook(id);
    button.parentElement.parentElement.remove();
}

async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const author = formData.get('author').trim();
    const title = formData.get('title').trim();

    const result = await createBook({ author, title });

    tbody.appendChild(createRow(result._id, result));
    event.target.reset();
}

async function loadBooks() {
    const books = await request(
        'http://localhost:3030/jsonstore/collections/books'
    );

    const result = Object.entries(books).map(([id, book]) =>
        createRow(id, book)
    );
    tbody.replaceChildren(...result);
}

async function loadBookById(id) {
    const book = await request(
        'http://localhost:3030/jsonstore/collections/books/' + id
    );

    return book;
}

function createRow(id, book) {
    const editBtn = e('button', { className: 'editBtn' }, 'Edit');
    const deleteBtn = e('button', { className: 'deleteBtn' }, 'Delete');

    const row = e(
        'tr',
        {},
        e('td', {}, book.title),
        e('td', {}, book.author),
        e('td', {}, editBtn, deleteBtn)
    );

    deleteBtn.dataset.id = id;
    editBtn.dataset.id = id;

    return row;
}

async function createBook(book) {
    const result = await request(
        'http://localhost:3030/jsonstore/collections/books',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        }
    );

    return result;
}

async function updateBook(id, book) {
    const result = await request(
        'http://localhost:3030/jsonstore/collections/books/' + id,
        {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        }
    );

    return result;
}

async function deleteBook(id) {
    const result = await request(
        'http://localhost:3030/jsonstore/collections/books/' + id,
        {
            method: 'delete',
        }
    );

    return result;
}

async function request(url, options) {
    const response = await fetch(url, options);

    if (response.ok == false) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();

    return data;
}

function e(type, attr, ...content) {
    let element = document.createElement(type);

    for (let prop in attr) {
        element[prop] = attr[prop];
    }

    for (let entry of content) {
        if (typeof entry == 'string' || typeof entry == 'number') {
            entry = document.createTextNode(entry);
        }

        element.appendChild(entry);
    }

    return element;
}
