import { html } from '../lib.js';
import { logout } from '../api/users.js';
import { getUserData, clearUserData } from '../util.js';

const userNavigationTemplate = (onLogout) => html`
    <div id="user">
        <a id="createLink" href="/create">Create Furniture</a>
        <a id="profileLink" href="/my-furniture">My Publications</a>
        <a id="logoutBtn" href="javascript:void(0)" @click=${onLogout}
            >Logout</a
        >
    </div>
`;

const guestNavigationTemplate = () => html`
    <div id="guest">
        <a id="loginLink" href="/login">Login</a>
        <a id="registerLink" href="/register">Register</a>
    </div>
`;

const navigationTemplate = (isAuthenticated, onLogout) => html`
    <header>
        <h1><a href="/">Furniture Store</a></h1>
        <nav>
            <a id="catalogLink" href="/dashboard" class="active">Dashboard</a>
            ${isAuthenticated
                ? userNavigationTemplate(onLogout)
                : guestNavigationTemplate()}
        </nav>
    </header>
`;

export { navigationTemplate };

export function navigation(ctx) {
    return navigationTemplate(getUserData(), onLogout);

    async function onLogout(event) {
        await logout();
        clearUserData();
        ctx.page.redirect('/dashboard');
    }
}
