import { editAnimalById, getAnimalById } from '../api/data.js';
import { html } from '../lib.js';

const editTemplate = (animal, onSubmit) => html`
    <section id="editPage">
        <form class="editForm" @submit=${onSubmit}>
            <img src="/images/editpage-dog.jpg" />
            <div>
                <h2>Edit PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        value="${animal.name}"
                    />
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input
                        name="breed"
                        id="breed"
                        type="text"
                        value="${animal.breed}"
                    />
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input
                        name="age"
                        id="age"
                        type="text"
                        value="${animal.age}"
                    />
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input
                        name="weight"
                        id="weight"
                        type="text"
                        value="${animal.weight}"
                    />
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input
                        name="image"
                        id="image"
                        type="text"
                        value="${animal.image}"
                    />
                </div>
                <button class="btn" type="submit">Edit Pet</button>
            </div>
        </form>
    </section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const animal = await getAnimalById(id);
    ctx.render(editTemplate(animal, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const missing = [...formData.entries()].filter(([k, v]) => v == '');

        try {
            if (missing.length > 0) {
                throw new Error('All fields are required!');
            }

            const editedAnimal = await editAnimalById(id, {
                name: data.name,
                breed: data.breed,
                age: data.age,
                weight: data.weight,
                image: data.image,
            });

            ctx.page.redirect('/details/' + editedAnimal._id);
        } catch (error) {
            alert(error.message);
        }
    }
}
