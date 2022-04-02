import { logout } from '../api/users.js';
import { html } from '../lib.js';
import { clearUserData, getUserData } from '../util.js';

const navigationTemplate = (user, onLogout) => html`
    <nav>
        <section class="logo">
            <img src="/images/logo.png" alt="logo" />
        </section>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/catalog">Dashboard</a></li>
            ${user
                ? html`<li><a href="/create">Create Postcard</a></li>
                      <li><a href="#" @click=${onLogout}>Logout</a></li>`
                : html`<li><a href="/login">Login</a></li>
                      <li><a href="/register">Register</a></li>`}
        </ul>
    </nav>
`;

export function navigation(ctx) {
    const user = getUserData();
    return navigationTemplate(user, onLogout);

    async function onLogout(event) {
        event.preventDefault();
        await logout();
        clearUserData();
        ctx.page.redirect('/');
    }
}
