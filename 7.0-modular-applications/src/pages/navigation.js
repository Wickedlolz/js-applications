import { html } from '../lib.js';
import { getUserData } from '../util.js';

const navigationTemplate = (user) => html`
    <header id="titlebar" class="layout">
        <a href="#" class="site-logo">Team Manager</a>
        <nav>
            <a href="#" class="action">Browse Teams</a>
            ${user
                ? html`<a href="#" class="action">My Teams</a>
                      <a href="#" class="action">Logout</a>`
                : html`<a href="#" class="action">Login</a>
                      <a href="#" class="action">Register</a>`}
        </nav>
    </header>
`;

export function navigation() {
    const user = getUserData();
    return navigationTemplate(user);
}
