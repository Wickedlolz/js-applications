import { html, until } from '../lib.js';
import { getUserData } from '../util.js';
import { deleteFurnitureById } from '../api/data.js';

const furnitureCardTemplate = (furniture, isAuthor, onDelete) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img
                    src=${furniture.img.startsWith('./')
                        ? `.${furniture.img}`
                        : `${furniture.img}`}
                />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${furniture.make}</span></p>
        <p>Model: <span>${furniture.model}</span></p>
        <p>Year: <span>${furniture.year}</span></p>
        <p>Description: <span>${furniture.description}</span></p>
        <p>Price: <span>${furniture.price}</span></p>
        <p>Material: <span>${furniture.material}</span></p>
        ${isAuthor
            ? html`<div>
                  <a href="/edit/${furniture._id}" class="btn btn-info">Edit</a>
                  <a
                      href="javascript:void(0)"
                      @click=${onDelete}
                      class="btn btn-red"
                      >Delete</a
                  >
              </div>`
            : ''}
    </div>
`;

const detailsTemplate = (furniturePromise) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        ${until(furniturePromise, html`<p>Loading &hellip;</p>`)}
    </div>
`;

export function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadFurniture()));

    async function loadFurniture() {
        const furniture = await ctx.furniturePromise;

        const user = getUserData();
        const isAuthor = user && user._id == furniture._ownerId;
        return furnitureCardTemplate(furniture, isAuthor, onDelete);
    }

    async function onDelete(event) {
        const confirmed = confirm('Are you sure you want to delete this item?');

        if (confirmed) {
            await deleteFurnitureById(ctx.params.id);
            ctx.page.redirect('/dashboard');
        }
    }
}
