import { logout } from './api/users.js';
import { showHome } from './pages/home.js';
import { showRegister } from './pages/register.js';
import { showLogin } from './pages/login.js';
import { showDashboard } from './pages/dashboard.js';
import { showDetails } from './pages/details.js';
import { showCreate } from './pages/create.js';
import { init } from './router.js';

const routes = {
    '/': showHome,
    '/register': showRegister,
    '/login': showLogin,
    '/dashboard': showDashboard,
    '/details': showDetails,
    '/create': showCreate,
    '/logout': onLogout,
};

document.getElementById('views').remove();

const router = init(routes);
router.updateNav();

router.redirect('/');

function onLogout() {
    logout();
    router.updateNav();
    router.redirect('/');
}
