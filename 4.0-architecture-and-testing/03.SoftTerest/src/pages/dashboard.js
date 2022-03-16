const dashboardSection = document.getElementById('dashboard-holder');
import { getAllIdeas } from '../api/data.js';
import { e } from '../dom.js';

dashboardSection.addEventListener('click', onDetailsSelect);

let ctx = null;

export async function showDashboard(context) {
    ctx = context;
    const ideas = await getAllIdeas();

    if (ideas.length > 0) {
        dashboardSection.replaceChildren(...ideas.map(createIdeaPreview));
    }

    context.showSection(dashboardSection);
}

function createIdeaPreview(idea) {
    const detailsBtn = e(
        'a',
        { className: 'btn', href: '/details' },
        'Details'
    );

    const element = e(
        'div',
        { className: 'card overflow-hidden current-card details' },
        e(
            'div',
            { className: 'card-body' },
            e('p', { className: 'card-text' }, idea.title)
        ),
        e('img', {
            className: 'card-image',
            src: idea.img,
            alt: 'Card image cap',
        }),
        detailsBtn
    );

    element.style.width = 20 + 'rem';
    element.style.height = 18 + 'rem';
    detailsBtn.dataset.id = idea._id;

    return element;
}

function onDetailsSelect(event) {
    if (event.target.tagName == 'A') {
        event.preventDefault();
        const id = event.target.dataset.id;

        if (id) {
            ctx.redirect('/details', id);
        }
    }
}
