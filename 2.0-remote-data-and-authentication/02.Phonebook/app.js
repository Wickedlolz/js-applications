function attachEvents() {
    const btnLoad = document.getElementById('btnLoad');
    const btnCreate = document.getElementById('btnCreate');

    btnLoad.addEventListener('click', onLoadContacts);
    btnCreate.addEventListener('click', onCreateClick);
}

attachEvents();

async function onCreateClick() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ person: person.value, phone: phone.value }),
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        person.value = '';
        phone.value = '';
    } catch (error) {
        alert(error.message);
    }
}

async function onLoadContacts() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const phonebookList = document.getElementById('phonebook');

    try {
        const response = await fetch(url);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        phonebookList.innerHTML = '';

        for (let key in data) {
            let person = data[key];
            const deleteBtn = e('button', {}, 'Delete');
            const liElement = e(
                'li',
                {},
                `${person.person}: ${person.phone}`,
                deleteBtn
            );

            deleteBtn.addEventListener(
                'click',
                onDeleteClick.bind(null, person._id)
            );
            phonebookList.appendChild(liElement);
        }
    } catch (error) {
        alert(error.message);
    }
}

async function onDeleteClick(id) {
    const url = 'http://localhost:3030/jsonstore/phonebook/';

    try {
        const response = await fetch(url + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        onLoadContacts();
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
