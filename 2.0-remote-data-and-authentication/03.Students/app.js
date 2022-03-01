window.addEventListener('DOMContentLoaded', start);

async function start() {
    onLoadStudents();

    const form = document.getElementById('form');
    form.addEventListener('submit', onCreateStudent);
}

async function onCreateStudent(event) {
    event.preventDefault();
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const notification = document.querySelector('.notification');
    notification.textContent = '';

    const form = event.target;
    const formData = new FormData(form);

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    if (
        firstName == '' ||
        lastName == '' ||
        facultyNumber == '' ||
        grade == ''
    ) {
        notification.textContent = 'All fields are required.';
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                facultyNumber,
                grade: Number(grade).toFixed(2),
            }),
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        form.reset();
        onLoadStudents();
    } catch (error) {
        alert(error.message);
    }
}

async function onLoadStudents() {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const tbodyElement = document.querySelector('#results tbody');

    try {
        const response = await fetch(url);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        tbodyElement.innerHTML = '';
        for (let key in data) {
            let student = data[key];

            const trElement = e(
                'tr',
                {},
                e('td', {}, student.firstName),
                e('td', {}, student.lastName),
                e('td', {}, student.facultyNumber),
                e('td', {}, `${Number(student.grade).toFixed(2)}`)
            );

            tbodyElement.appendChild(trElement);
        }
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
