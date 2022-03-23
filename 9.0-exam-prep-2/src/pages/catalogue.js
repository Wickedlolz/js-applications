import { html, until } from '../lib.js';
import { getAllGames } from '../api/data.js';

const gameTemplate = (game) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src="${game.imageUrl}" />
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href="/details/${game._id}" class="details-button">Details</a>
        </div>
    </div>
`;

const catalogueTemplate = (gamesPromise) => html`
    <section id="catalog-page">
        <h1>All Games</h1>
        ${until(
            gamesPromise,
            html`<p class="no-articles">Loading &hellip;</p>`
        )}
    </section>
`;

export function cataloguePage(ctx) {
    ctx.render(catalogueTemplate(loadGames()));
}

async function loadGames() {
    const games = await getAllGames();

    if (games.length > 0) {
        return games.map(gameTemplate);
    } else {
        return html`<h3 class="no-articles">No articles yet</h3>`;
    }
}
