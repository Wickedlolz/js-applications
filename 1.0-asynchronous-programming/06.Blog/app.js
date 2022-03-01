async function attachEvents() {
    const btnLoadPosts = document.getElementById('btnLoadPosts');
    const btnViewPost = document.getElementById('btnViewPost');
    const postsSelectElement = document.getElementById('posts');

    btnLoadPosts.addEventListener(
        'click',
        onLoadPostsClick.bind(null, postsSelectElement)
    );

    btnViewPost.addEventListener(
        'click',
        onViewPostClick.bind(null, postsSelectElement)
    );
}

attachEvents();

async function onViewPostClick(postsSelectElement, event) {
    const id = postsSelectElement.value;
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');
    const post = await getPostById(id);
    const comments = await getComments(postsSelectElement.value);

    postTitle.textContent = post.title;
    const postBodyElement = e('p', {}, post.body);
    postBody.innerHTML = '';
    postBody.appendChild(postBodyElement);

    let filteredComment = [];

    for (let key in comments) {
        if (comments[key].postId == id) {
            filteredComment.push(comments[key]);
        }
    }

    postComments.innerHTML = '';
    filteredComment
        .map((c) => e('li', { id: c.id }, c.text))
        .forEach((c) => postComments.appendChild(c));
}

async function onLoadPostsClick(postsSelectElement, event) {
    const posts = await getPosts();
    postsSelectElement.innerHTML = '';

    for (let key in posts) {
        const post = posts[key];
        const optionElement = e('option', { value: post.id }, post.title);

        postsSelectElement.appendChild(optionElement);
    }
}

async function getPosts() {
    try {
        const response = await fetch(
            'http://localhost:3030/jsonstore/blog/posts'
        );

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const posts = await response.json();

        return posts;
    } catch (error) {
        alert(error.message);
    }
}

async function getPostById(id) {
    try {
        const response = await fetch(
            'http://localhost:3030/jsonstore/blog/posts/' + id
        );

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const post = await response.json();

        return post;
    } catch (error) {
        alert(error.message);
    }
}

async function getComments() {
    try {
        const response = await fetch(
            'http://localhost:3030/jsonstore/blog/comments'
        );

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const comments = await response.json();

        return comments;
    } catch (error) {
        alert(error.message);
    }
}

function e(type, attr, ...content) {
    let element = document.createElement(type);

    for (let prop in attr) {
        element[prop] = attr[prop];
    }

    for (let entry of content) {
        if (typeof entry == 'string' || typeof entry == 'number') {
            entry = document.createTextNode(entry);
        }

        element.appendChild(entry);
    }

    return element;
}
