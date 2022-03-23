import { deleteSongById } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../util.js';

const songTemplate = (song, onDelete) => html`
    <div class="wrapper">
        <div class="albumCover">
            <img src="${song.imgUrl}" />
        </div>
        <div class="albumInfo">
            <div class="albumText">
                <h1>Name: ${song.name}</h1>
                <h3>Artist: ${song.artist}</h3>
                <h4>Genre: ${song.genre}</h4>
                <h4>Price: $${song.price}</h4>
                <h4>Date: ${song.releaseDate}</h4>
                <p>${song.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->
            ${song.isOwner
                ? html`<div class="actionBtn">
                      <a href="/edit/${song._id}" class="edit">Edit</a>
                      <a
                          href="javascript:void(0)"
                          @click=${onDelete}
                          class="remove"
                          >Delete</a
                      >
                  </div>`
                : null}
        </div>
    </div>
`;

const detailsTemplate = (songPromise) => html`
    <section id="detailsPage">
        ${until(songPromise, html`<p>Loading &hellip;</p>`)}
    </section>
`;

export function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadSong()));

    async function loadSong() {
        const song = await ctx.songPromise;
        const user = getUserData();
        const isOwner = user._id == song._ownerId;
        song.isOwner = isOwner;

        return songTemplate(song, onDelete);
    }

    async function onDelete() {
        const confirmed = confirm(
            'Are you sure you want to delete this album?'
        );

        if (confirmed) {
            await deleteSongById(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}
