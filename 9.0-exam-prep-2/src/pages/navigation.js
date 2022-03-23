import { html } from '../lib.js';
import { logout } from '../api/users.js';
import { getUserData, clearUserData } from '../util.js';

const navigationTemplate = (user, onLogout) => html`
    <header>
        <h1><a class="home" href="/">GamesPlay</a></h1>
        <nav>
            <a href="/catalogue">All games</a>
            ${user
                ? html`<div id="user">
                      <a href="/create">Create Game</a>
                      <a href="javascript:void(0)" @click=${onLogout}>Logout</a>
                  </div>`
                : html`<div id="guest">
                      <a href="/login">Login</a>
                      <a href="/register">Register</a>
                  </div>`}
        </nav>
    </header>
`;

export function navigation(ctx) {
    return navigationTemplate(getUserData(), onLogout);

    async function onLogout(event) {
        await logout();
        clearUserData();
        ctx.page.redirect('/');
    }
}
