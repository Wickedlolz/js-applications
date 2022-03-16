import { ideaById, deleteIdeaById } from '../api/data.js';
import { e } from '../dom.js';

const detailsSection = document.getElementById('details-view');

export async function showDetails(context, id) {
    const idea = await ideaById(id);
    const user = JSON.parse(localStorage.getItem('user'));
    const isOwner = user && user._id == idea._ownerId;

    detailsSection.replaceChildren(createIdeaCard(idea, isOwner));

    context.showSection(detailsSection);

    if (isOwner) {
        document
            .getElementById('deleteBtn')
            .addEventListener('click', (event) => {
                event.preventDefault();

                const choice = confirm(
                    'Are you sure you want to delete this idea?'
                );

                if (choice) {
                    deleteIdeaById(id);
                    context.redirect('/dashboard');
                }
            });
    }
}

function createIdeaCard(idea, isOwner) {
    const fragment = document.createDocumentFragment();

    const image = e('img', { className: 'det-img', src: idea.img });
    const desctipiton = e(
        'div',
        { className: 'desc' },
        e('h2', { className: 'display-5' }, idea.title),
        e('p', { className: 'infoType' }, 'Description:'),
        e('p', { className: 'idea-description' }, idea.description)
    );

    const deleteBtn = e(
        'a',
        { className: 'btn detb', href: '/delete', id: 'deleteBtn' },
        'Delete'
    );

    deleteBtn.dataset.id = idea._id;

    const deleteBtnDiv = e('div', { className: 'text-center' }, deleteBtn);

    fragment.appendChild(image);
    fragment.appendChild(desctipiton);

    if (isOwner) {
        fragment.appendChild(deleteBtnDiv);
    }

    return fragment;
}
