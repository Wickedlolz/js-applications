import { render, page } from './lib.js';
import { loadFurniture } from './util.js';

import { navigation } from './pages/navigation.js';
import { dashboardPage } from './pages/dashboard.js';
import { loginPage } from './pages/login.js';
import { registerPage } from './pages/register.js';
import { createPage } from './pages/create.js';
import { detailsPage } from './pages/details.js';
import { editPage } from './pages/edit.js';
import { myFurniturePage } from './pages/myFurniture.js';

page(decorateContext);
page('/dashboard', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', loadFurniture, detailsPage);
page('/edit/:id', loadFurniture, editPage);
page('/my-furniture', myFurniturePage);

page.redirect('/index.html', '/dashboard');
page.redirect('/', '/dashboard');

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) =>
        render(
            [navigation(ctx), content],
            document.querySelector('.container')
        );
    next();
}
