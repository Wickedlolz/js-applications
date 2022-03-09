import { homePage } from './pages/home.js';
import { registerPage } from './pages/register.js';
import { loginPage } from './pages/login.js';
import { createPage } from './pages/create.js';
import { detailsPage } from './pages/details.js';
import { editPage } from './pages/edit.js';
import { notFoundPage } from './pages/notFound.js';

const routes = {
    '/': homePage,
    '/login': loginPage,
    '/register': registerPage,
    '/create': createPage,
    '/details': detailsPage,
    '/edit': editPage,
};

export function router(path, id) {
    hideContent();

    const render = routes[path] || notFoundPage;
    render(id);
}

function hideContent() {
    const body = document.querySelector('body');

    for (let i = 1; i < body.children[0].children.length; i++) {
        let section = body.children[0].children[i];
        section.style.display = 'none';
    }
}
