import { logout } from '../api/users.js';
import { html } from '../lib.js';
import { clearUserData, getUserData } from '../util.js';

const navigationTemplate = (user, onLogout) => html`
    <nav>
        <img src="/images/headphones.png" />
        <a href="/">Home</a>
        <ul>
            <!--All user-->
            <li><a href="/catalog">Catalog</a></li>
            <li><a href="/search">Search</a></li>
            ${user
                ? html`<li><a href="/create">Create Album</a></li>
                      <li>
                          <a href="javascript:void(0)" @click=${onLogout}
                              >Logout</a
                          >
                      </li>`
                : html`<li><a href="/login">Login</a></li>
                      <li><a href="/register">Register</a></li>`}
        </ul>
    </nav>
`;

export function navigation(ctx) {
    return navigationTemplate(getUserData(), onLogout);

    async function onLogout(event) {
        await logout();
        clearUserData();
        ctx.page.redirect('/');
    }
}
