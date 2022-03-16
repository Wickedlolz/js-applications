const url = 'http://localhost:3030/jsonstore/collections/books/';

export async function getAllBooks() {
    try {
        const response = await fetch(url);

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const books = await response.json();

        return Object.entries(books);
    } catch (error) {
        alert(error.message);
    }
}

export async function getBookById(id) {
    try {
        const response = await fetch(url + id);

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const book = await response.json();

        return book;
    } catch (error) {
        alert(error.message);
    }
}

export async function createBook(data) {
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

        const createdBook = await response.json();

        return createdBook;
    } catch (error) {
        alert(error.message);
    }
}

export async function updateBook(id, data) {
    try {
        const response = await fetch(url + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const updatedBook = await response.json();

        return updatedBook;
    } catch (error) {
        alert(error.message);
    }
}

export async function deleteBookById(id) {
    try {
        const response = await fetch(url + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const deletedBook = await response.json();
        return deletedBook;
    } catch (error) {
        alert(error.message);
    }
}
