import { search } from '../api/data.js';
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
                <p class="date">Release ${song.releaseData}</p>
            </div>
            ${isAuthenticated
                ? html`<div class="btn-group">
                      <a href="/details/${song._id}" id="details">Details</a>
                  </div>`
                : null}
        </div>
    </div>
`;

const searchTemplate = (songs, onSearch) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input
                id="search-input"
                type="text"
                name="search"
                placeholder="Enter desired albums's name"
            />
            <button class="button-list" @click=${onSearch}>Search</button>
        </div>

        <h2>Results:</h2>

        <div class="search-result">
            ${until(songs, html`<p>Loading &hellip;</p>`)}
        </div>
    </section>
`;

export function searchPage(ctx) {
    update();

    function update(songs) {
        ctx.render(searchTemplate(songs, onSearch));
    }

    async function onSearch(event) {
        const searchInput = document.getElementById('search-input');
        const songs = await search(searchInput.value);
        const user = getUserData();

        if (songs.length > 0) {
            update(songs.map((s) => songTemplate(s, user)));
        } else {
            update(html`<p class="no-result">No result.</p>`);
        }
    }
}
