import { e } from './dom.js';
const homeViewDiv = document.getElementById('home-view');
const topicViewDiv = document.getElementById('topic-view');
const userComments = document.getElementById('user-comment');
const answerComment = document.querySelector('.answer-comment form');

answerComment.addEventListener('submit', onPostComment);

async function getTopicById(id) {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts/';

    try {
        const response = await fetch(url + id);

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const topic = await response.json();
        return topic;
    } catch (error) {
        alert(error.message);
    }
}

export async function renderTopicDetails(event) {
    event.preventDefault();

    const id = event.target.parentElement.dataset.id;
    const topic = await getTopicById(id);
    const comments = await getComments();
    const fragment = document.createDocumentFragment();

    Object.values(comments)
        .filter((c) => c.topicId == id)
        .forEach((c) => fragment.appendChild(createCommentCard(c)));

    userComments.appendChild(fragment);

    homeViewDiv.style.display = 'none';
    topicViewDiv.style.display = 'block';
    console.log(topic);
}

function createTopicDetailsCard(topic) {
    const element = e(
        'div',
        { className: 'header' },
        e('img', { src: './static/profile.png', alt: 'avatar' }),
        e(
            'p',
            {},
            e('span', {}, topic.topicName),
            ' posted on ',
            e('time', {}, topic.createdAt)
        ),
        e('p', { className: 'post-content' }, topic.postText)
    );

    return element;
}

function createCommentCard(comment) {
    const element = e(
        'div',
        { className: 'user-comment' },
        e(
            'div',
            { className: 'topic-name-wrapper' },
            e(
                'div',
                { className: 'topic-name' },
                e(
                    'p',
                    {},
                    e('storng', {}, comment.username),
                    'commented on ',
                    e('time', {}, comment.createdAt)
                ),
                e(
                    'div',
                    { className: 'post-content' },
                    e('p', {}, comment.content)
                )
            )
        )
    );

    return element;
}

async function onPostComment(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
}

async function getComments() {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';

    try {
        const response = await fetch(url);

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const comments = await response.json();
        return comments;
    } catch (error) {
        alert(error.message);
    }
}

async function createComment(topicId, data) {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.messsage);
        }

        const createdComment = await response.json();
        return createdComment;
    } catch (error) {
        alert(error.message);
    }
}
