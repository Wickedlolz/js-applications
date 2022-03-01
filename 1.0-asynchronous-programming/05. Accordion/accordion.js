window.addEventListener('DOMContentLoaded', solution);

async function solution() {
    const mainSection = document.getElementById('main');
    const articles = await getArticles();

    articles.map(createArticle).forEach((a) => mainSection.appendChild(a));
}

function createArticle(article) {
    const moreBtn = e(
        'button',
        { className: 'button', id: article._id },
        'More'
    );

    let articleElement = e(
        'div',
        { className: 'accordion' },
        e('div', { className: 'head' }, e('span', {}, article.title), moreBtn)
    );

    moreBtn.addEventListener(
        'click',
        onMoreClick.bind(null, article._id, articleElement)
    );

    return articleElement;
}

async function onMoreClick(id, articleElement, event) {
    if (event.target.textContent == 'More') {
        const articleContent = await getArticleById(id);
        const extraContainer = e(
            'div',
            { className: 'extra' },
            e('p', {}, articleContent.content)
        );
        extraContainer.style.display = 'inline-flex';

        event.target.textContent = 'Less';
        articleElement.appendChild(extraContainer);
    } else if (event.target.textContent == 'Less') {
        articleElement.querySelector('.extra').remove();
        event.target.textContent = 'More';
    }
}

async function getArticleById(id) {
    try {
        const response = await fetch(
            'http://localhost:3030/jsonstore/advanced/articles/details/' + id
        );

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const article = await response.json();

        return article;
    } catch (error) {
        alert(error.message);
    }
}

async function getArticles() {
    try {
        const response = await fetch(
            'http://localhost:3030/jsonstore/advanced/articles/list'
        );

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const articles = await response.json();

        return articles;
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
