import { html } from '../lib.js';
import { login } from '../api/users.js';
import { setUserData } from '../util.js';

const loginTemplate = (onSubmit, errorMsg) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
            ${
                errorMsg
                    ? html`<p style="color: red">${errorMsg.message}</p>`
                    : ''
            }
        </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class=${
                            errorMsg.email
                                ? 'form-control is-invalid'
                                : 'form-control'
                        } id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class=${
                            errorMsg.email
                                ? 'form-control is-invalid'
                                : 'form-control'
                        } id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
    </div>
`;

export function loginPage(ctx) {
    update({});

    function update(errorMsg) {
        ctx.render(loginTemplate(onSubmit, errorMsg));
    }

    async function onSubmit(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.target);
            const email = formData.get('email').trim();
            const password = formData.get('password').trim();

            if (email == '' || password == '') {
                throw {
                    message: 'All fields are required!',
                    email: email == '',
                    password: password == '',
                };
            }

            const user = await login(email, password);
            setUserData(user);
            ctx.page.redirect('/dashboard');
        } catch (error) {
            update(error);
        }
    }
}
