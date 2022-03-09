import { renderPosts } from './home.js';

async function create(data) {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

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
            throw new Error(err.message);
        }

        const createdTopic = response.json();

        return createdTopic;
    } catch (error) {
        alert(error.message);
    }
}

export async function onCreate(event) {
    event.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    const topicName = formData.get('topicName').trim();
    const username = formData.get('username').trim();
    const postText = formData.get('postText').trim();
    const today = new Date();
    const date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
    const time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const createdAt = date + ' ' + time;

    const data = {
        topicName,
        username,
        postText,
        createdAt,
    };

    const createdTopic = await create(data);

    form.reset();
    renderPosts();
}
