import { register } from '../api/users.js';
import { html } from '../lib.js';
import { setUserData } from '../util.js';

const registerTemplate = (onSubmit) => html`
    <section id="registerPage">
        <form class="registerForm" @submit=${onSubmit}>
            <img src="/images/logo.png" alt="logo" />
            <h2>Register</h2>
            <div class="on-dark">
                <label for="email">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="steven@abv.bg"
                    value=""
                />
            </div>

            <div class="on-dark">
                <label for="password">Password:</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    value=""
                />
            </div>

            <div class="on-dark">
                <label for="repeatPassword">Repeat Password:</label>
                <input
                    id="repeatPassword"
                    name="repeatPassword"
                    type="password"
                    placeholder="********"
                    value=""
                />
            </div>

            <button class="btn" type="submit">Register</button>

            <p class="field">
                <span>If you have profile click <a href="#">here</a></span>
            </p>
        </form>
    </section>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeatPassword = formData.get('repeatPassword').trim();

        try {
            if (email == '' || password == '' || repeatPassword == '') {
                throw new Error('All fields are required!');
            }

            if (password != repeatPassword) {
                throw new Error("Password's not match!");
            }

            const user = await register(email, password);
            setUserData(user);
            event.target.reset();
            ctx.page.redirect('/');
        } catch (error) {
            alert(error.message);
        }
    }
}
