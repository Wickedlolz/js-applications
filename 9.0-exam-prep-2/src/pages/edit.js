import { html, until } from '../lib.js';
import { updateGameById } from '../api/data.js';

const gameTemplate = (data, onSubmit) => html`
    <section id="edit-page" class="auth">
        <form id="edit" @submit=${onSubmit}>
            <div class="container">
                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value="${data.title}"
                />

                <label for="category">Category:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value="${data.category}"
                />

                <label for="levels">MaxLevel:</label>
                <input
                    type="number"
                    id="maxLevel"
                    name="maxLevel"
                    min="1"
                    value="${data.maxLevel}"
                />

                <label for="game-img">Image:</label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value="${data.imageUrl}"
                />

                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary">${data.summary}</textarea>
                <input class="btn submit" type="submit" value="Edit Game" />
            </div>
        </form>
    </section>
`;

const editTemplate = (gamePromise) => html`
    ${until(gamePromise, html`<p class="no-articles">Loading &hellip;</p>`)}
`;

export function editPage(ctx) {
    ctx.render(editTemplate(loadGame()));

    async function loadGame() {
        const game = await ctx.gamePromise;
        return gameTemplate(game, onSubmit);
    }

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = [...formData.entries()].reduce(
            (a, [k, v]) => Object.assign(a, { [k]: v.trim() }),
            {}
        );

        const missing = [...formData.entries()].filter(([k, v]) => v == '');

        if (missing.length > 0) {
            alert('All fields are required!');
            return;
        }

        const updatedGame = await updateGameById(ctx.params.id, data);
        ctx.page.redirect('/details/' + updatedGame._id);
    }
}
