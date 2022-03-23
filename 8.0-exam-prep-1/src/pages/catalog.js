import { getAllSongs } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../util.js';

const songTemplate = (song, isAuthenticated) => html`
    <div class="card-box">
        <img src="${song.imgUrl}" />
        <div>
            <div class="text-center">
                <p class="name">Name: ${song.name}</p>
                <p class="artist">Artist: ${song.artist}</p>
                <p class="genre">Genre: ${song.genre}</p>
                <p class="price">Price: $${song.price}</p>
                <p class="date">Release Date: ${song.releaseDate}</p>
            </div>
            ${isAuthenticated
                ? html`<div class="btn-group">
                      <a href="/details/${song._id}" id="details">Details</a>
                  </div>`
                : null}
        </div>
    </div>
`;

const catalogTemplate = (songPromise) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>
        ${until(songPromise, html`<p>Loading &hellip;</p>`)}
    </section>
`;

export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadSongs()));
}

async function loadSongs() {
    const songs = await getAllSongs();
    const isAuthenticated = getUserData();

    if (songs.length > 0) {
        return songs.map((s) => songTemplate(s, isAuthenticated));
    } else {
        return html`<p>No Albums in Catalog!</p>`;
    }
}
