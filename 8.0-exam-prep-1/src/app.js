import { page } from './lib.js';
import { decorateContext } from './middlewares/render.js';
import { catalogPage } from './pages/catalog.js';
import { createPage } from './pages/create.js';
import { detailsPage } from './pages/details.js';
import { editPage } from './pages/edit.js';
import { homePage } from './pages/home.js';
import { loginPage } from './pages/login.js';
import { registerPage } from './pages/register.js';
import { searchPage } from './pages/search.js';
import { loadSong } from './util.js';

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/edit/:id', loadSong, editPage);
page('/details/:id', loadSong, detailsPage);
page('/search', searchPage);

page.redirect('/index.html', '/');

page.start();
