import { deleteAnimalById, getAnimalById } from '../api/data.js';
import {
    getDonationsForUser,
    getTotalDonations,
    makeDonate,
} from '../api/donations.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (animal, onDelete, onDonate, donationPrice) => html`
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src="${animal.image}" />
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${animal.name}</h1>
                    <h3>Breed: ${animal.breed}</h3>
                    <h4>Age: ${animal.age}</h4>
                    <h4>Weight: ${animal.weight}</h4>
                    <h4 class="donation">Donation: ${donationPrice}$</h4>
                </div>
                <!-- if there is no registered user, do not display div-->
                ${animal.isAuthenticated
                    ? html`<div class="actionBtn">
                          <!-- Only for registered user and creator of the pets-->
                          ${animal.isOwner
                              ? html`<a href="/edit/${animal._id}" class="edit"
                                        >Edit</a
                                    >
                                    <a
                                        href="#"
                                        class="remove"
                                        @click=${onDelete}
                                        >Delete</a
                                    >`
                              : nothing}
                          <!--(Bonus Part) Only for no creator and user-->
                          ${animal.canDonate && animal.isDonated
                              ? html`<a
                                    href="#"
                                    class="donate"
                                    @click=${onDonate}
                                    >Donate</a
                                >`
                              : nothing}
                      </div>`
                    : nothing}
            </div>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    update();

    async function update() {
        const user = getUserData();
        const animal = await getAnimalById(id);
        let donationCount = await getTotalDonations(id);
        const isDonated = await getDonationsForUser(id, user._id);

        if (user) {
            animal.isOwner = user._id == animal._ownerId;
            animal.isAuthenticated = true;
            animal.canDonate = user._id != animal._ownerId;
            animal.isDonated = isDonated == 0;
        }

        donationCount = donationCount * 100;

        ctx.render(detailsTemplate(animal, onDelete, onDonate, donationCount));
    }

    async function onDelete(event) {
        event.preventDefault();
        const choice = confirm(`Are you sure you want to delete this animal?`);

        if (choice) {
            await deleteAnimalById(id);
            ctx.page.redirect('/catalog');
        }
    }

    async function onDonate(event) {
        const donate = await makeDonate(id);
        update();
    }
}
