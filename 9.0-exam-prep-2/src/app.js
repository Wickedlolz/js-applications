import { page, render } from './lib.js';
import { loadGame } from './util.js';

import { navigation } from './pages/navigation.js';
import { homePage } from './pages/home.js';
import { loginPage } from './pages/login.js';
import { registerPage } from './pages/register.js';
import { cataloguePage } from './pages/catalogue.js';
import { createPage } from './pages/create.js';
import { detailsPage } from './pages/details.js';
import { editPage } from './pages/edit.js';

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalogue', cataloguePage);
page('/create', createPage);
page('/details/:id', loadGame, detailsPage);
page('/edit/:id', loadGame, editPage);

page.redirect('/index.html', '/');

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) =>
        render(
            [navigation(ctx), content],
            document.querySelector('#box #main-content')
        );
    next();
}
