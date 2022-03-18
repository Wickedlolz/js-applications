import { render, page, html } from './lib.js';
import { navigation } from './pages/navigation.js';

import { homePage } from './pages/home.js';

page(decorateContext);
page('/', homePage);

page.redirect('/index.html', '/');

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) =>
        render([navigation(), content], document.querySelector('#content'));

    next();
}
