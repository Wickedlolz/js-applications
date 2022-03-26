import { html, until } from '../lib.js';
import { getUserData } from '../util.js';
import { getMyFurniture } from '../api/data.js';

const furnitureCardTemplate = (furniture) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img
                    src=${furniture.img.startsWith('./')
                        ? `.${furniture.img}`
                        : `${furniture.img}`}
                />
                <p>${furniture.description}</p>
                <footer>
                    <p>Price: <span>${furniture.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${furniture._id}" class="btn btn-info"
                        >Details</a
                    >
                </div>
            </div>
        </div>
    </div>
`;

const myFurnitureTemplate = (furniturePromise) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
        ${until(furniturePromise, html`<p>Loading &hellip;</p>`)}
    </div>
`;

export function myFurniturePage(ctx) {
    ctx.render(myFurnitureTemplate(loadFurnitures()));

    async function loadFurnitures() {
        const userId = getUserData()._id;
        const items = await getMyFurniture(userId);

        return items.map(furnitureCardTemplate);
    }
}
