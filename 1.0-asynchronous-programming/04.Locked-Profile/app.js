async function lockedProfile() {
    const mainElement = document.getElementById('main');

    const response = await fetch(
        'http://localhost:3030/jsonstore/advanced/profiles'
    );
    const profiles = await response.json();

    mainElement.innerHTML = '';
    for (let key in profiles) {
        let profile = profiles[key];
        mainElement.appendChild(createProfileCard(profile));
    }

    function createProfileCard(profile) {
        let showMoreBtn = e('button', {}, 'Show more');

        let hiddenInfoElement = e(
            'div',
            { className: 'hiddenInfo' },
            e('hr', {}),
            e('label', {}, 'Email:'),
            e('input', {
                type: 'email',
                name: 'user1Email',
                value: profile.username,
                disabled: true,
            }),
            e('label', {}, 'Age:'),
            e('input', {
                type: 'email',
                name: 'user1Age',
                value: profile.age,
                disabled: true,
            })
        );

        let card = e(
            'div',
            { className: 'profile' },
            e('img', { src: './iconProfile2.png', className: 'userIcon' }),
            e('label', {}, 'Lock'),
            e('input', {
                type: 'radio',
                name: profile.username,
                value: 'lock',
                checked: true,
            }),
            e('label', {}, 'Unlock'),
            e('input', {
                type: 'radio',
                name: profile.username,
                value: 'unlock',
            }),
            e('br', {}),
            e('hr', {}),
            e('label', {}, 'Username'),
            e('input', {
                type: 'text',
                name: 'user1Username',
                value: profile.username,
                disabled: true,
            }),
            hiddenInfoElement,
            showMoreBtn
        );

        showMoreBtn.addEventListener(
            'click',
            onShowMoreBtnClick.bind(null, hiddenInfoElement)
        );

        return card;
    }
}

function onShowMoreBtnClick(hiddenInfoElement, event) {
    const unlockBox = event.target.parentElement.querySelector(
        "input[value='unlock']"
    );

    if (unlockBox.checked) {
        if (hiddenInfoElement.className == 'hiddenInfo') {
            hiddenInfoElement.classList.remove('hiddenInfo');
        } else {
            hiddenInfoElement.classList.add('hiddenInfo');
        }
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
