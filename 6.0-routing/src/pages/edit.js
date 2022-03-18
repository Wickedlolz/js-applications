import { html, until } from '../lib.js';
import { updateFurniture } from '../api/data.js';

const editFormTemplate = (furniture, onSubmit, errorMsg, errors) => html`
    ${errorMsg ? html`<p style="color: red">${errorMsg}</p>` : ''}
    <form @submit=${(event) => onSubmit(event, furniture._id)}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make"
                        >Make</label
                    >
                    <input
                        class=${errors.make
                            ? 'form-control is-invalid'
                            : 'form-control'}
                        id="new-make"
                        type="text"
                        name="make"
                        value=${furniture.make}
                    />
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model"
                        >Model</label
                    >
                    <input
                        class=${errors.model
                            ? 'form-control is-invalid'
                            : 'form-control'}
                        id="new-model"
                        type="text"
                        name="model"
                        value=${furniture.model}
                    />
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year"
                        >Year</label
                    >
                    <input
                        class=${errors.year
                            ? 'form-control is-invalid'
                            : 'form-control'}
                        id="new-year"
                        type="number"
                        name="year"
                        value=${furniture.year}
                    />
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description"
                        >Description</label
                    >
                    <input
                        class=${errors.description
                            ? 'form-control is-invalid'
                            : 'form-control'}
                        id="new-description"
                        type="text"
                        name="description"
                        value=${furniture.description}
                    />
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price"
                        >Price</label
                    >
                    <input
                        class=${errors.price
                            ? 'form-control is-invalid'
                            : 'form-control'}
                        id="new-price"
                        type="number"
                        name="price"
                        value=${furniture.price}
                    />
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image"
                        >Image</label
                    >
                    <input
                        class=${errors.img
                            ? 'form-control is-invalid'
                            : 'form-control'}
                        id="new-image"
                        type="text"
                        name="img"
                        value=${furniture.img}
                    />
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material"
                        >Material (optional)</label
                    >
                    <input
                        class="form-control"
                        id="new-material"
                        type="text"
                        name="material"
                        value=${furniture.material}
                    />
                </div>
                <input type="submit" class="btn btn-info" value="Edit" />
            </div>
        </div>
    </form>
`;

const editTemplate = (furniturePromise) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    ${until(furniturePromise, html`<p>Loading &hellip;</p>`)}
`;

export function editPage(ctx) {
    update(null, {});

    function update(errorMsg, errors) {
        ctx.render(editTemplate(loadFurniture(errorMsg, errors)));
    }

    async function loadFurniture(errorMsg, errors) {
        const furniture = await ctx.furniturePromise;
        return editFormTemplate(furniture, onSubmit, errorMsg, errors);
    }

    async function onSubmit(event, id) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = [...formData.entries()].reduce(
            (a, [k, v]) => Object.assign(a, { [k]: v.trim() }),
            {}
        );

        const missing = [...formData.entries()].filter(
            ([k, v]) => k != 'material' && v == ''
        );

        try {
            if (missing.length > 0) {
                const errors = missing.reduce(
                    (a, [k, v]) => Object.assign(a, { [k]: true }),
                    {}
                );

                throw {
                    error: new Error('All fields are required!'),
                    errors,
                };
            }

            data.year = Number(data.year);
            data.price = Number(data.price);

            const result = await updateFurniture(id, data);
            ctx.page.redirect('/details/' + result._id);
        } catch (error) {
            const message = error.message || error.error.message;
            update(message, error.errors || {});
        }
    }
}
