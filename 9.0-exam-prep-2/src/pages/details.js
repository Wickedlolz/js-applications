import { html, until } from '../lib.js';
import { createComment, deleteGameById, getAllComments } from '../api/data.js';
import { getUserData } from '../util.js';

const gameCardTemplate = (
    game,
    isAuthor,
    onDelete,
    isAuthenticated,
    commentsPromise,
    onSubmit
) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
            <div class="game-header">
                <img class="game-img" src="${game.imageUrl}" />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>

            <p class="text">${game.summary}</p>

            <div class="details-comments">
                <h2>Comments:</h2>
                <ul>
                    ${until(commentsPromise, html`<p>Loading &hellip;</p>`)}
                </ul>
            </div>

            <!-- Edit/Delete buttons ( Only for creator of this game )  -->
            ${isAuthor
                ? html`<div class="buttons">
                      <a href="/edit/${game._id}" class="button">Edit</a>
                      <a
                          href="javascript:void(0)"
                          @click=${onDelete}
                          class="button"
                          >Delete</a
                      >
                  </div>`
                : null}
        </div>

        <!-- Bonus -->
        <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
        ${isAuthenticated
            ? html`<article class="create-comment">
                  <label>Add new comment:</label>
                  <form class="form" @submit=${onSubmit}>
                      <textarea
                          name="comment"
                          placeholder="Comment......"
                      ></textarea>
                      <input
                          class="btn submit"
                          type="submit"
                          value="Add Comment"
                      />
                  </form>
              </article>`
            : null}
    </section>
`;

const detailsTemplate = (gamePromise) => html`
    ${until(gamePromise, html`<p class="no-articles">Loading &hellip;</p>`)}
`;

export function detailsPage(ctx) {
    update();

    function update() {
        ctx.render(detailsTemplate(loadGame()));
    }

    async function loadGame() {
        const game = await ctx.gamePromise;
        const user = getUserData();

        let isAuthor = false;

        if (user) {
            isAuthor = game._ownerId == user._id;
        }

        const isAuthenticated = user && user._id != game._ownerId;

        return gameCardTemplate(
            game,
            isAuthor,
            onDelete,
            isAuthenticated,
            allComments(),
            onSubmit
        );
    }

    async function onDelete(event) {
        const confirmed = confirm('Are you sure you want to delete this game?');

        if (confirmed) {
            await deleteGameById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function allComments() {
        const comments = await getAllComments(ctx.params.id);

        if (comments.length > 0) {
            return comments.map(
                (c) =>
                    html`<li class="comment"><p>Content: ${c.comment}</p></li>`
            );
        } else {
            return html`<p class="no-comment">No comments.</p>`;
        }
    }

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const commnet = formData.get('comment').trim();

        if (commnet == '') {
            alert('Comment fields is empty!');
            return;
        }

        await createComment(ctx.params.id, commnet);
        update();
    }
}
