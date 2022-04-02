import { page, render } from './lib.js';
import { catalogPage } from './pages/catalog.js';
import { createPage } from './pages/create.js';
import { detailsPage } from './pages/details.js';
import { editPage } from './pages/edit.js';
import { homePage } from './pages/home.js';
import { loginPage } from './pages/login.js';
import { navigation } from './pages/navigation.js';
import { registerPage } from './pages/register.js';

const nav = document.getElementById('nav-header');
const main = document.getElementById('content');

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

page.redirect('/index.html', '/');
page.start();

function decorateContext(context, next) {
    render(navigation(context), nav);
    context.render = (content) => render(content, main);
    next();
}
