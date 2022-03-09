import { e } from './dom.js';
import { renderTopicDetails } from './topicDetails.js';

async function getPosts() {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

    try {
        const response = await fetch(url);

        if (response.status != 200) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const posts = await response.json();

        return posts;
    } catch (error) {
        alert(error.message);
    }
}

function createPostCard(post) {
    const linkElement = e(
        'a',
        { href: '#', className: 'normal' },
        e('h2', {}, post.topicName)
    );

    const element = e(
        'div',
        { className: 'topic-name-wrapper' },
        e(
            'div',
            { className: 'topic-name' },
            linkElement,
            e(
                'div',
                { className: 'columns' },
                e(
                    'div',
                    {},
                    e(
                        'p',
                        {},
                        'Date: ',
                        e('time', {}, post.createdAt ? post.createdAt : '')
                    )
                ),
                e(
                    'div',
                    { className: 'nick-name' },
                    e('p', {}, 'Username: ', e('span', {}, post.username))
                )
            )
        )
    );

    linkElement.dataset.id = post._id;
    linkElement.addEventListener('click', renderTopicDetails);

    return element;
}

export async function renderPosts() {
    const container = document.querySelector('.topic-title .topic-container');
    container.innerHTML = '<p>Loading...</p>';
    const posts = await getPosts();

    container.innerHTML = '';
    for (let key in posts) {
        const post = posts[key];

        container.appendChild(createPostCard(post));
    }
}
