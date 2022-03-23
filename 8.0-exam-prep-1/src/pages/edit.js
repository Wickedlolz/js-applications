import { editSongById } from '../api/data.js';
import { html, until } from '../lib.js';

const editFormTemplate = (song, onSubmit) => html`
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input
                    id="name"
                    name="name"
                    class="name"
                    type="text"
                    value="${song.name}"
                />

                <label for="imgUrl" class="vhide">Image Url</label>
                <input
                    id="imgUrl"
                    name="imgUrl"
                    class="imgUrl"
                    type="text"
                    value="${song.imgUrl}"
                />

                <label for="price" class="vhide">Price</label>
                <input
                    id="price"
                    name="price"
                    class="price"
                    type="text"
                    value="${song.price}"
                />

                <label for="releaseDate" class="vhide">Release date</label>
                <input
                    id="releaseDate"
                    name="releaseDate"
                    class="releaseDate"
                    type="text"
                    value="${song.releaseDate}"
                />

                <label for="artist" class="vhide">Artist</label>
                <input
                    id="artist"
                    name="artist"
                    class="artist"
                    type="text"
                    value="${song.artist}"
                />

                <label for="genre" class="vhide">Genre</label>
                <input
                    id="genre"
                    name="genre"
                    class="genre"
                    type="text"
                    value="${song.genre}"
                />

                <label for="description" class="vhide">Description</label>
                <textarea
                    name="description"
                    class="description"
                    rows="10"
                    cols="10"
                >
${song.description}</textarea
                >

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
`;

const editTemplate = (songPromise) => html`
    <section class="editPage">
        ${until(songPromise, html`<p>Loading &hellip;</p>`)}
    </section>
`;

export function editPage(ctx) {
    ctx.render(editTemplate(loadSong()));

    async function loadSong() {
        const song = await ctx.songPromise;
        return editFormTemplate(song, onSubmit);
    }

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const data = [...formData.entries()].reduce(
            (a, [k, v]) => Object.assign(a, { [k]: v.trim() }),
            {}
        );

        const missing = [...formData.entries()].filter(([k, v]) => v == '');

        try {
            if (missing.length > 0) {
                throw new Error('All fields are required!');
            }

            const editedSong = await editSongById(ctx.params.id, data);
            event.target.reset();
            ctx.page.redirect('/details/' + editedSong._id);
        } catch (error) {
            alert(error.message);
        }
    }
}
