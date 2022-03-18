import { html } from '../lib.js';
import { register } from '../api/users.js';

const registerTemplate = (onSubmit, errorMsg, errors) => html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
                ${errorMsg ? html`<p style="color: red">${errorMsg}</p>` : ''}
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class=${
                            errors.email
                                ? 'form-control is-invalid'
                                : 'form-control'
                        } id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class=${
                            errors.password
                                ? 'form-control is-invalid'
                                : 'form-control'
                        } id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class=${
                            errors.rePass
                                ? 'form-control is-invalid'
                                : 'form-control'
                        } id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
    </div>
`;

export function registerPage(ctx) {
    update(null, {});

    function update(errorMsg, errors) {
        ctx.render(registerTemplate(onSubmit, errorMsg, errors));
    }

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('rePass').trim();

        try {
            if (email == '' || password == '') {
                throw {
                    error: new Error('All fields are required!'),
                    errors: {
                        email: email == '',
                        password: password == '',
                        rePass: rePass == '',
                    },
                };
            }

            if (password != rePass) {
                throw {
                    error: new Error("Passwords dont't match!"),
                    errors: {
                        password: true,
                        rePass: true,
                    },
                };
            }

            await register(email, password);
            ctx.page.redirect('/dashboard');
        } catch (error) {
            const message = error.message || error.error.message;
            update(message, error.errors || {});
        }
    }
}
