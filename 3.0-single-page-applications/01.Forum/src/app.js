import { renderPosts } from './home.js';
import { onCreate } from './createTopic.js';

document.querySelector('nav a').addEventListener('click', (event) => {
    event.preventDefault();

    const homeViewDiv = document.getElementById('home-view');
    const topicViewDiv = document.getElementById('topic-view');

    topicViewDiv.style.display = 'none';
    homeViewDiv.style.display = 'block';
});

document.querySelector('form').addEventListener('submit', onCreate);
renderPosts();
